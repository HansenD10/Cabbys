import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class HomePage extends ContentItem {
  public logo!: Elements.AssetsElement;
  public bannerMessage!: Elements.TextElement;
  public backgroundImage!: Elements.AssetsElement;
  constructor() {
    super({
      propertyResolver: (elementName: string): string => {
        if (elementName === 'banner_message') {
          return 'bannerMessage';
        }
        if (elementName === 'background_image') {
          return 'backgroundImage';
        }
        return elementName;
      }
    });
  }
}
