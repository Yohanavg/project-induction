import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { KtronixInterface } from './interface/ktronix.interface';

@Injectable()
export class KtronixService {
  constructor(private readonly httpService: HttpService) {}

  async searchKtronix(query: string): Promise<KtronixInterface[]> {
    console.log('🔍 Valor recibido en el servicio:', query);
    const url = 'https://qx5ips1b1q-dsn.algolia.net/1/indexes/*/queries';

    // 2. Los datos de autenticación que sacamos de tu URL
    const headers = {
      'x-algolia-agent': 'Algolia for JavaScript (5.20.0)',
      'x-algolia-application-id': 'QX5IPS1B1Q',
      'x-algolia-api-key': '7a8800d62203ee3a9ff1cdf74f99b268',
    };

    // 3. El cuerpo de la petición (Payload) que acabas de encontrar
    const body = {
      requests: [
        {
          indexName: 'ktronixIndexAlgoliaPRD',
          query,
          hitsPerPage: 25,
          page: 0,
        },
      ],
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<{ results: { hits: any[] }[] }>(url, body, {
          headers,
        }),
      );

      // Mapear
      console.log('Primer producto de Algolia:', data.results[0].hits[0]);
      return data.results[0].hits.map((item: any) => ({
        name: item.name_text_es,
        price: item.lowestprice_double,
        image: `https://www.ktronix.com${item['img-310wx310h_string']}`,
        url: `https://www.ktronix.com${item.url_es_string}`,
        source: 'Ktronix-Algolia',
      }));
    } catch (error) {
      console.error('Error en Algolia:', error);
      throw new Error('No se pudo obtener datos de Ktronix');
    }
  }
}
