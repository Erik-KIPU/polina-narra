// Все медиа сейчас — бесплатные стоковые файлы Pexels (pexels.com/license),
// подгружаются напрямую с их CDN. Для боевой версии замените на собственные
// ролики и фото студии (положите в /public/media и укажите путь вида '/media/dien.mp4').

export type Clip = { src: string; poster: string };

const clip = (id: number, file: string, posterSlug = `pexels-photo-${id}.jpeg`): Clip => ({
  src: `https://videos.pexels.com/video-files/${id}/${file}`,
  poster: `https://images.pexels.com/videos/${id}/${posterSlug}?auto=compress&cs=tinysrgb&w=1600`,
});

export const photo = (path: string, w = 1400) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}`;

export const clips = {
  window: clip(7292650, '7292650-hd_1920_1080_24fps.mp4'),
  silk: clip(7677260, '7677260-hd_1280_720_25fps.mp4'),
  lettering: clip(10474642, '10474642-hd_1280_720_30fps.mp4', 'artist-craft-handmade-hobby-10474642.jpeg'),
  layouts: clip(5384675, '5384675-hd_1366_720_30fps.mp4'),
  shadow: clip(7292660, '7292660-hd_1280_720_24fps.mp4', 'abstract-analogue-apple-art-7292660.jpeg'),
  leather: clip(6661924, '6661924-hd_1366_720_25fps.mp4'),
  print: clip(855469, '855469-hd_1280_720_30fps.mp4', 'free-video-855469.jpg'),
  backstage: clip(3917527, '3917527-hd_1366_720_50fps.mp4'),
  pencil: clip(13593921, '13593921-hd_1280_720_30fps.mp4', 'art-dibujar-documentary-film-13593921.jpeg'),
  photoshoot: clip(5481284, '5481284-hd_1280_720_24fps.mp4'),
  cinema: clip(7988642, '7988642-hd_1366_720_25fps.mp4'),
} satisfies Record<string, Clip>;
