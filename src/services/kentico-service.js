import { DeliveryClient } from '@kentico/kontent-delivery';
// import BasePage from '../models/BasePage';

export default class KenticoService {
  constructor() {
    this.deliveryClient = new DeliveryClient({ projectId: 'cdceeea5-2b9a-00d7-1815-baf8514b167a'  }); 
  }

  mapData = (data) => {
    return {
      nav: this.getNavigation(data.firstItem.navigation.value),
      homepage: this.getHomePage(data.firstItem.home_page.value[0]),
      hours: this.getHours(data.items[0].hours.value),
      menu: this.getMenu(data.items[0].menu.value[0]),
      events: this.getEvents(data.items[0].events.value[0]),
      gallery: this.getGallery(data.items[0].gallery.value[0]),
      about: this.getAbout(data.items[0].about.value[0])
    }
  }

  getAbout = (about) => {
    return {
      bio: about.bio.value,
      email: about.email.value,
      phoneNumber: about.phone_number.value
    }
  }
  
  // Clean Gallery GraphQL Data
  getGallery = (gallery) => {
    return gallery.images.value.map(image => {
      return {
        name: image.name,
        url: image.url
      }
    });
  }
  
  // Clean Events GraphQL Data
  getEvents = (events) => {
    return {
      missingEventMessage: events.missing_events_message.value,
      events: events.events.value.map(event => {
        return {
          date: event.date.value,
          description: event.description.value,
          headerImage: event.header_image.value[0].url,
          headline: event.headline.value
        }
      })
    }
  }
  
  // Clean Menu GraphQL Data
  getMenu = (menu) => {
    let cleanedMenu = menu.foods.value.reduce((prev, cat) => {
      prev[cat.category_name.value] = cat.menu_items.value.map(item => {
        return {
          description: item.description.value,
          name: item.name.value,
          notes: item.notes.value,
          price: item.price.value
        }
      })
      return prev
    }, {});
  
    cleanedMenu = menu.drinks.value.reduce((prev, cat) => {
      prev[cat.category_name.value] = cat.menu_items.value.map(item => {
        return {
          description: item.description.value,
          name: item.name.value,
          notes: item.notes.value,
          price: item.price.value
        }
      })
      return prev
    }, cleanedMenu);
    
    return cleanedMenu;
  }
  
  // Clean Hours GraphQL Data
  getHours = (hours) => {
    const cleanedHours = hours.map(day => {
      return {
        day: day.day.value,
        isClosed: day.is_closed.value[0].name,
        openTime: day.open_time.value,
        closeTime: day.close_time.value
      }
    });
  
    return cleanedHours;
  }
  
  // Clean Home Page GraphQL Data
  getHomePage = (homePage) => {
    const cleanedHomePage = {
      backgroundImage: {
        url: homePage.background_image.value[0].url,
        name: homePage.background_image.value[0].name
      },
      logo: {
        url: homePage.logo.value[0].url,
        name: homePage.logo.value[0].name
      }
    };
  
    return cleanedHomePage;
  }
  
  // Clean Navigation GraphQL Data
  getNavigation = (navigation) => {
    const cleanedNav = navigation.map(nav => {
      return nav.links.value.map(links => {
        return {
          linkText: links.link_text.value,
          linkUrl: links.link_url.value
        }
      })
    })
    
    return cleanedNav;
  }
  
  // Get all Data for KC
  GetData = () => {
    return this.deliveryClient.items()
      .type('base_page')
      .depthParameter(10)
      .toPromise()
      .then(data => new Promise((resolve, reject) => resolve(this.mapData(data))))
      .catch(e => console.error(e));
    }
}