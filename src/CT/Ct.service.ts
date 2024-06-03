import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CommercetoolsService {
  private authUrl: string;
  private apiUrl: string;
  private clientId: string;
  private clientSecret: string;
  private projectKey: string;

  async getToken(): Promise<string> {
    try {
      const response = await axios.post(
        this.authUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          scope: `manage_project:${this.projectKey}`,
        }),
        {
          auth: {
            username: this.clientId,
            password: this.clientSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (response.status === 200) {
        return response.data.access_token;
      } else {
        throw new HttpException('Failed to fetch token', response.status);
      }
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch token',
        error.response?.status || 500,
      );
    }
  }
  async fetchCustomers(): Promise<any> {
    try {
      const token = await this.getToken();
      const response = await axios.get(
        `${this.apiUrl}/${this.projectKey}/customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          'Failed to fetch customers',
          response.status,
          response.data,
        );
        throw new HttpException('Failed to fetch customers', response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
      } else {
        console.error('Unknown error:', error);
      }
      throw new HttpException(
        error.response?.data || 'Failed to fetch customers',
        error.response?.status || 500,
      );
    }
  }
}
