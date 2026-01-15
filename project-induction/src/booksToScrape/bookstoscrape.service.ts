import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { BooksToScrapeInterface } from './interface/bookstoscrape.interface';

@Injectable()
export class BookstoscrapeService {
  constructor(private readonly httpService: HttpService) {}

  async scrapeTestBooks(name: string): Promise<BooksToScrapeInterface[]> {
    const url = 'https://books.toscrape.com/';

    try {
      // 1. Petición simple (aquí no necesitas headers complejos)
      const { data } = await firstValueFrom(this.httpService.get(url));
      const $ = cheerio.load(data);
      const results: BooksToScrapeInterface[] = [];

      // 2. Iteramos por cada artículo de producto
      $('article.product_pod').each((i, el) => {
        // Extraemos el título del atributo 'title' del enlace, que es más completo
        const title = $(el).find('h3 a').attr('title') || 'Sin título';

        // Extraemos el precio y lo limpiamos
        const priceRaw = $(el).find('.price_color').text();
        const price = parseFloat(priceRaw.replace('£', ''));

        // Extraemos la imagen (la URL es relativa, hay que completarla)
        const imageRelative = $(el).find('.image_container img').attr('src');
        const image = url + imageRelative;

        const relativeLink = $(el).find('h3 a').attr('href');
        const link = url + relativeLink; // Construimos la URL completa

        results.push({
          title,
          price,
          image,
          link,
          source: 'BooksToScrape',
        });
      });

      console.log(`¡Éxito! Encontramos ${results.length} libros de prueba`);
      return results;
    } catch (error) {
      throw new HttpException(
        'Error en el ejercicio de Cheerio',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
