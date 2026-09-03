import { NextResponse } from 'next/server';

interface GenerateSEOPayload {
  name: string;
  description?: string;
  fabric?: string;
  category?: string;
  gender?: string;
  price?: number;
}

export async function POST(request: Request) {
  try {
    const body: GenerateSEOPayload = await request.json();
    const { name, description = '', fabric = 'Satín Seda', category = '', gender = 'Mujer', price = 0 } = body;

    if (!name) {
      return NextResponse.json({ error: 'Nombre de producto requerido' }, { status: 400 });
    }

    // Claves primaria y de contingencia (Fallback)
    const primaryKey = process.env.NVIDIA_API_KEY;
    const fallbackKey = process.env.NVIDIA_API_KEY_FALLBACK;
    const model = process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct';
    const apiUrl = process.env.NVIDIA_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';

    // Fallback técnico local garantizado (100% blindado para Google)
    const fallbackSEO = {
      metaTitle: `${name} en ${fabric} Medellín | Lovely Night`,
      metaDescription: `Pijama ${name.toLowerCase()} en ${fabric.toLowerCase()} confeccionada en Medellín. Tela suave que no transparenta. Envío con Pago Contraentrega en tu puerta.`,
      focusKeyword: `pijamas ${fabric.toLowerCase()} medellin`,
      imageAlt: `Pijama ${name} confeccionada en ${fabric} en Medellín - Marca Lovely Night`,
    };

    const systemPrompt = `Eres un redactor y especialista senior en SEO E-commerce radicado en Medellín, Colombia, trabajando exclusivamente para la marca de pijamas "Lovely Night".
Tu misión es generar metadatos de altísima conversión orgánica para posicionar la tienda en Google Colombia (Medellín y Valle de Aburrá).

REGLAS DE VOCABULARIO Y TONO (ESTRICTAS):
1. IDIOMA: 100% Español de Colombia. PROHIBIDO terminantemente usar anglicismos o palabras en inglés como "loungewear", "sleepwear", "outfit", "comfy", "must-have", "bestseller", "cozy", "trendy", "shipping", etc.
2. VOCABULARIO LOCAL: Habla natural y cercano al estilo de Medellín. Usa términos como:
   - "Pijamas", "Pijama camisera", "Set de short", "Bata", "Satín seda", "Piel de durazno".
   - "Confección en Medellín", "Hecho en Medellín", "Pago Contraentrega", "Pagas al recibir en tu puerta", "Envíos a todo el país", "Telas suaves que no transparentan".
3. metaTitle:
   - Longitud: Entre 45 y 58 caracteres (nunca superes 60 para que Google no lo corte).
   - Estructura recomendada: [Nombre Prenda] en [Tela] Medellín | Lovely Night
4. metaDescription:
   - Longitud: Entre 135 y 155 caracteres exactos.
   - Debe ser seductora, mencionar la suavidad de la prenda, la confección en Medellín y el gancho de venta clave: "Pago Contraentrega".
5. focusKeyword:
   - Entre 3 y 5 palabras en minúsculas sin tildes, con intención de búsqueda transaccional en Colombia (ej: "pijamas satin seda medellin" o "pijamas piel de durazno contraentrega").
6. imageAlt:
   - Texto descriptivo exacto para Google Imágenes en español puro, mencionando la prenda, el color o tela y la procedencia Medellín.

FORMATO DE SALIDA:
Devuelve ÚNICAMENTE un objeto JSON válido, sin introducciones, sin explicaciones y sin bloques markdown adicionales.
Estructura:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "focusKeyword": "...",
  "imageAlt": "..."
}`;

    const userPrompt = `Genera los metadatos SEO para la siguiente prenda de nuestra boutique en Medellín:
- Nombre de la prenda: ${name}
- Tela principal: ${fabric}
- Categoría: ${category || 'Pijamas'}
- Género: ${gender}
- Precio al público: ${price > 0 ? `$${price.toLocaleString('es-CO')} COP` : 'Precio especial'}
- Descripción dada por la dueña: ${description || 'Prenda delicada y suave para descansar'}`;

    // Función auxiliar para consultar NVIDIA con reintento automático
    async function callNvidiaAI(token: string) {
      return await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.15,
          max_tokens: 300,
        }),
      });
    }

    let activeResponse: Response | null = null;

    // Intento 1: Con API Key principal
    if (primaryKey) {
      try {
        const res = await callNvidiaAI(primaryKey);
        if (res.ok) {
          activeResponse = res;
        } else {
          console.warn(`Primary NVIDIA key returned status: ${res.status}. Switching to fallback key...`);
        }
      } catch (err) {
        console.warn('Primary NVIDIA key network error:', err);
      }
    }

    // Intento 2: Con API Key de fallback si el intento 1 falló
    if (!activeResponse && fallbackKey) {
      try {
        const resFallback = await callNvidiaAI(fallbackKey);
        if (resFallback.ok) {
          activeResponse = resFallback;
        } else {
          console.warn(`Fallback NVIDIA key returned status: ${resFallback.status}`);
        }
      } catch (err) {
        console.warn('Fallback NVIDIA key network error:', err);
      }
    }

    // Si alguno de los dos respondió exitosamente, parsear el JSON
    if (activeResponse) {
      const data = await activeResponse.json();
      const rawContent = data.choices?.[0]?.message?.content || '';

      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json({
          success: true,
          provider: 'nvidia-ai',
          seo: {
            metaTitle: parsed.metaTitle || fallbackSEO.metaTitle,
            metaDescription: parsed.metaDescription || fallbackSEO.metaDescription,
            focusKeyword: parsed.focusKeyword || fallbackSEO.focusKeyword,
            imageAlt: parsed.imageAlt || fallbackSEO.imageAlt,
          },
        });
      }
    }

    // Fallback garantizado si ambas claves fallan o no hay red externa
    return NextResponse.json({
      success: true,
      provider: 'local-seo-engine',
      seo: fallbackSEO,
    });
  } catch (error) {
    console.error('Error in AI SEO route:', error);
    return NextResponse.json({
      success: true,
      provider: 'safe-fallback',
      seo: {
        metaTitle: `Pijamas en Satín Seda Medellín | Lovely Night`,
        metaDescription: `Pijamas confeccionadas en Medellín con telas de alta costura que no transparentan. Pide con envío y Pago Contraentrega en tu puerta.`,
        focusKeyword: `pijamas contraentrega medellin`,
        imageAlt: `Pijama suave confeccionada en Medellín - Lovely Night`,
      },
    });
  }
}
