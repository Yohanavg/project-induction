import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { BuscalibreInterface } from './interface/buscalibre.interface';

@Injectable()
export class BuscalibreService {
  constructor(private readonly httpService: HttpService) {}

  async searchPokemonBooks(query: string) {
    // 1. URL de búsqueda
    const url = `https://www.buscalibre.com.co/libros/search/?q=${encodeURIComponent(query)}`;

    try {
      // 2. Obtener el HTML
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'es-ES,es;q=0.9',
          },
        }),
      );
      const $ = cheerio.load(data);
      const results: BuscalibreInterface[] = [];
      // 3. Iterar sobre cada caja de producto
      $('.box-producto').each((i, el) => {
        // Extraer Título
        const title = $(el).find('.nombre').text().trim();

        // Extraer Precio y convertirlo a número (quitando $, puntos y espacios)
        const priceRaw = $(el).find('.precio-ahora').text();
        const price = parseInt(priceRaw.replace(/[^0-9]/g, '')) || 0;

        // Extraer Link
        const link = $(el).find('a.enlace-producto').attr('href');

        // Extraer Imagen (manejando el lazy-load de Buscalibre)
        const image =
          $(el).find('img').attr('data-src') || $(el).find('img').attr('src');

        // Solo agregamos si tiene datos mínimos
        if (title && price > 0 && link && image) {
          results.push({
            title,
            price,
            link,
            image,
            source: 'Buscalibre',
          });
        }
      });

      console.log('--- DEBUG BUSCALIBRE ---');
      console.log('Tamaño del HTML:', data.length);
      console.log('Título de la página recibida:', $('title').text());
      console.log('¿Existe .box-producto?:', $('.box-producto').length > 0);
      console.log(`¡Éxito! Encontramos ${results.length} libros de Pokémon`);
      console.table(results, ['title', 'price']);

      return results;
    } catch (error) {
      throw new HttpException(
        'Error al scrapear Buscalibre: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
