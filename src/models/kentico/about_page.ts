import { SocialMediaLink } from './social_media_link';
import { ContentItem, Elements } from '@kentico/kontent-delivery';

export class AboutPage extends ContentItem {
  public email!: Elements.TextElement;
  public bio!: Elements.RichTextElement;
  public phoneNumber!: Elements.TextElement;
  public socialMediaLinks!: Elements.LinkedItemsElement<SocialMediaLink>;
  constructor() {
    super({
      propertyResolver: (elementName: string): string => {
        if (elementName === 'phone_number') {
          return 'phoneNumber';
        }
        if (elementName === 'social_media_links') {
          return 'socialMediaLinks';
        }
        return elementName;
      }
    });
  }
}
