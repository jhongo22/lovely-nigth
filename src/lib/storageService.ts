import { supabase } from './supabaseClient';

/**
 * Sube una imagen directamente al bucket público 'productos' de Supabase
 * y retorna la URL pública lista para almacenar en la base de datos.
 */
export async function uploadProductImage(file: File): Promise<string> {
  // Limpiar el nombre del archivo para evitar caracteres inválidos
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-');
  const filePath = `uploads/${Date.now()}-${cleanName}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('productos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    console.error('Error subiendo imagen a Supabase Storage:', error);
    throw new Error(`Error al subir imagen: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('productos')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

/**
 * Permite subir múltiples imágenes en paralelo
 */
export async function uploadMultipleProductImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadProductImage(file));
  return Promise.all(uploadPromises);
}
