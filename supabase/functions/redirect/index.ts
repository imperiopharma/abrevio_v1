
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { UAParser } from 'https://esm.sh/ua-parser-js@1.0.37';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the Supabase URL and key from environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    // Create authenticated Supabase client (with service role key)
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the slug from the URL path
    const url = new URL(req.url);
    const slug = url.pathname.replace('/', '');
    
    if (!slug) {
      return Response.redirect('https://abrev.io', 302);
    }
    
    // Query the database to find the corresponding link
    const { data: link, error } = await supabase
      .from('links')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !link) {
      console.error('Link not found:', error);
      return Response.redirect('https://abrev.io/not-found', 302);
    }
    
    // Check if the link is active
    if (!link.is_active) {
      return Response.redirect('https://abrev.io/inactive', 302);
    }
    
    // Check if the link has expired
    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return Response.redirect('https://abrev.io/expired', 302);
    }
    
    // Parse user agent to get device, browser, os information
    const parser = new UAParser(req.headers.get('user-agent') || '');
    const browserResult = parser.getBrowser();
    const deviceResult = parser.getDevice();
    const osResult = parser.getOS();
    
    // Log click data
    const clickData = {
      link_id: link.id,
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '',
      user_agent: req.headers.get('user-agent') || '',
      referer: req.headers.get('referer') || '',
      browser: browserResult.name || 'Unknown',
      device: deviceResult.type || (browserResult.name?.includes('Mobile') ? 'mobile' : 'desktop'),
      os: osResult.name || 'Unknown',
      // We would use a geo location service here in production
      country: 'Unknown',
      city: 'Unknown'
    };
    
    // Insert click data asynchronously (don't wait for the result)
    supabase.from('clicks').insert([clickData]).then(result => {
      if (result.error) {
        console.error('Error logging click:', result.error);
      }
    });
    
    // Redirect to the original URL
    return Response.redirect(link.original_url, 302);
  } catch (error) {
    console.error('Unexpected error:', error);
    return Response.redirect('https://abrev.io/error', 302);
  }
});
