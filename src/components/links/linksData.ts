
import { LinkType } from './types';

// Temporary sample data for demonstration
export const demoLinks: LinkType[] = [
  {
    id: '1',
    user_id: 'user123',
    short_url: 'abrev.io/blog',
    original_url: 'https://exemplo.com/blog/como-usar-encurtador-de-urls-para-melhorar-suas-campanhas',
    slug: 'blog',
    clicks: 245,
    is_active: true,
    created_at: '2023-10-15'
  },
  {
    id: '2',
    user_id: 'user123',
    short_url: 'abrev.io/promo',
    original_url: 'https://exemplo.com/promocao/desconto-especial-para-novos-clientes',
    slug: 'promo',
    clicks: 897,
    is_active: true,
    created_at: '2023-10-12'
  },
  {
    id: '3',
    user_id: 'user123',
    short_url: 'abrev.io/ebook',
    original_url: 'https://exemplo.com/downloads/ebook-estrategias-marketing-digital-2023',
    slug: 'ebook',
    clicks: 136,
    is_active: true,
    created_at: '2023-10-05'
  },
  {
    id: '4',
    user_id: 'user123',
    short_url: 'abrev.io/evento',
    original_url: 'https://exemplo.com/eventos/conferencia-tecnologia-2023-inscricao',
    slug: 'evento',
    clicks: 412,
    is_active: true,
    created_at: '2023-09-28'
  },
  {
    id: '5',
    user_id: 'user123',
    short_url: 'abrev.io/contato',
    original_url: 'https://exemplo.com/sobre/fale-conosco',
    slug: 'contato',
    clicks: 89,
    is_active: true,
    created_at: '2023-09-15'
  }
];
