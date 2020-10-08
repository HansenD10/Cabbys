import { AboutPage } from './../models/kentico/about_page';
import { MenuItem } from './../models/kentico/menu_item';
import { NavLink } from './../models/kentico/link';
import { HomePage } from './../models/kentico/home_page';
import {
  DeliveryClient,
  TypeResolver,
  ItemResponses
} from '@kentico/kontent-delivery';
import { BasePage } from '../models/kentico/base_page';
import { Subject, Observable } from 'rxjs';
import { EventList } from '../models/kentico/event_list';
import { Event } from '../models/kentico/event';
import { Hours } from '../models/kentico/hours';
import { MenuCategory } from '../models/kentico/menu_category';
import { Menu } from '../models/kentico/menu';
import { SocialMediaLink } from '../models/kentico/social_media_link';

export default class KenticoService {
  private deliveryClient: DeliveryClient;
  public SiteData: Subject<BasePage> = new Subject<BasePage>();

  constructor() {
    this.deliveryClient = new DeliveryClient({
      projectId: 'cdceeea5-2b9a-00d7-1815-baf8514b167a',
      typeResolvers: [
        new TypeResolver('about_page', (): AboutPage => new AboutPage()),
        new TypeResolver(
          'social_media_link',
          (): SocialMediaLink => new SocialMediaLink()
        ),
        new TypeResolver('menu', (): Menu => new Menu()),
        new TypeResolver('menu_category', (): MenuCategory => new MenuCategory()),
        new TypeResolver('menu_item', (): MenuItem => new MenuItem()),
        new TypeResolver('link', (): NavLink => new NavLink()),
        new TypeResolver('event_list', (): EventList => new EventList()),
        new TypeResolver('event', (): Event => new Event()),
        new TypeResolver('hours', (): Hours => new Hours()),
        new TypeResolver('home_page', (): HomePage => new HomePage()),
        new TypeResolver('base_page', (): BasePage => new BasePage())
      ]
    });
  }

  public GetData(): Observable<
    ItemResponses.ViewContentItemResponse<BasePage>
  > {
    return this.deliveryClient
      .item<BasePage>('cabbys_base_page')
      .depthParameter(10)
      .toObservable();
  }
}
