import { BlockRegistry } from '../../../shared/types/block';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { ButtonBlock } from './blocks/ButtonBlock';
import { VideoBlock } from './blocks/VideoBlock';
import { FormBlock } from './blocks/FormBlock';
import { MapBlock } from './blocks/MapBlock';

export const blockRegistry: BlockRegistry = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  video: VideoBlock,
  form: FormBlock,
  map: MapBlock,
}; 