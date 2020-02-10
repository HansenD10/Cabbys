import { ContentItem, ITypeResolverData } from "@kentico/kontent-delivery";

export class BasePage extends ContentItem {
  public navigation: Navigation | undefined;
  public homePage: HomePage | undefined;
  public hours: Hours | undefined;
  public menu: Menu | undefined;
  public eventList: EventList | undefined;
  public gallery: Asset[] | undefined;
  public about: About | undefined;

  constructor(data: ITypeResolverData | undefined) {
    super();
    data 
      ? this.mapData(data)
      : this.setEmpty();
  }
  
  setEmpty = () => {
    this.navigation = undefined;
    this.homePage = undefined;
    this.hours = undefined;
    this.menu = undefined;
    this.eventList = undefined;
    this.gallery = undefined;
    this.about = undefined;
  }

  mapData(data: ITypeResolverData) {
    const { navigation, home_page, hours, menu, events, gallery, about } = data.item.elements;
    const { modularContent } = data;

    this.navigation = new Navigation(navigation.value, modularContent);
    this.homePage = new HomePage(modularContent[home_page.value[0]]);
    this.hours = new Hours(hours.value, modularContent);
    this.menu = new Menu(modularContent[menu.value[0]], modularContent);
    this.eventList = new EventList(modularContent[events.value[0]], modularContent);
    this.gallery = modularContent[gallery.value[0]].elements.images.value.map((image: any) => new Asset(image));
    this.about = new About(modularContent[about.value[0]], modularContent);
  }
}

export class Navigation {
  public links: NavLink[];

  constructor(data: any, modular: any) {
    this.links = [];
    data.forEach((nav: any) => {
      let navSec = modular[nav]
      navSec.elements.links.value.forEach((link: any) => {
        this.links.push(new NavLink(modular[link]))
      })
    })
  }
}

export class NavLink {
  public linkText: string;
  public linkUrl: string;

  constructor(data: any) {
    this.linkText = data.elements.link_text.value;
    this.linkUrl = data.elements.link_url.value;
  }
}

export class HomePage {
  public backgroundImage: Asset;
  public logo: Asset

  constructor(data: any) {
    this.backgroundImage = new Asset(data.elements.background_image.value[0]);
    this.logo = new Asset(data.elements.logo.value[0]);
  }
}

export class Hours {
  public hours: Hour[];

  constructor(data: any, modular: any) {
    this.hours = [];

    data.forEach((hour: any) => {
      this.hours.push(new Hour(modular[hour]));
    })
  }
}

export class Hour {
  public day: string;
  public isClosed: boolean;
  public openTime: string;
  public closeTime: string;

  constructor(data: any) {
    this.day = data.elements.day.value;
    this.isClosed = data.elements.is_closed.value[0].name === 'No';
    this.openTime = data.elements.open_time.value;
    this.closeTime = data.elements.close_time.value;
  }
}

export class Menu {
  public categories: MenuCategory[];

  constructor(data: any, modular: any) {
    this.categories = [];
    Object.keys(data.elements).forEach((type: any) => {
      data.elements[type].value.forEach((cat: any) => {
        this.categories.push(new MenuCategory(modular[cat], modular));
      });
    });
  }
}

export class MenuCategory {
  public category: string;
  public items: MenuItem[];

  constructor(data: any, modular: any) {
    this.items = [];
    this.category = data.elements.category_name.value;
    data.elements.menu_items.value.forEach((item: any) => {
      this.items.push(new MenuItem(modular[item]));
    })
  }
}

export class MenuItem {
  public description: string;
  public name: string;
  public notes: string;
  public price: string;

  constructor(data: any) {
    this.description = data.elements.description.value;
    this.name = data.elements.name.value;
    this.notes = data.elements.notes.value;
    this.price = data.elements.price.value;
  }
}

export class EventList {
  public missingEventMessage: string;
  public events: Event[];

  constructor(data: any, modular: any) {
    this.events = [];
    this.missingEventMessage = data.elements.missing_events_message.value;
    data.elements.events.value && data.elements.events.value.forEach((event: any) => {
      this.events.push(new Event(modular[event]));
    })
  }
}

export class Event {
  public date: string;
  public description: string;
  public headerImage: Asset;
  public headline: string;

  constructor(data: any) {
    this.date = data.elements.date.value;
    this.description = data.elements.description.value;
    this.headerImage = new Asset(data.elements.header_image.value[0]);
    this.headline = data.elements.headline.value;
  }
}

export class Asset extends ContentItem {
  public name: string;
  public url: string;

  constructor(data: any) {
    super()

    this.name = data.name;
    this.url = data.url;
  }
}

export class About {
  public bio: string;
  public email: string;
  public phoneNumber: string;
  public socialMediaLinks: SocialMediaLink[];

  constructor(data: any, modular: any) {
    this.bio = data.elements.bio.value;
    this.email = data.elements.email.value;
    this.phoneNumber = data.elements.phone_number.value;
    this.socialMediaLinks = data.elements.social_media_links.value.map((link: any) => {
      return new SocialMediaLink(modular[link]);
    })
  }
}

export class SocialMediaLink {
  public link: string;
  public linkIcon: Asset;

  constructor(data: any) {
    this.link = data.elements.link.value;
    this.linkIcon = new Asset(data.elements.icon.value[0]);
  }
}
