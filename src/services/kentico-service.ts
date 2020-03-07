import { DeliveryClient, TypeResolver } from '@kentico/kontent-delivery';
import { BasePage } from '../models/KenticoModels';
import { Subject } from 'rxjs';

export default class KenticoService {
  private deliveryClient: DeliveryClient;
  public SiteData: Subject<BasePage> = new Subject<BasePage>();

  constructor() {
    this.deliveryClient = new DeliveryClient({
      projectId: 'cdceeea5-2b9a-00d7-1815-baf8514b167a',
      typeResolvers: [
        new TypeResolver('base_page', data => new BasePage(data))
      ]
    });
  }

  private setCachedData(data: string): void {
    window.localStorage.setItem('kentico_data', data);
  }

  private getCachedData(): string {
    return window.localStorage.getItem('kentico_data') || '';
  }

  // Get all Data for KC
  public InitializeKenticoData(): void {
    let cachedData = this.getCachedData();

    if (cachedData !== '') {
      this.SiteData.next(JSON.parse(cachedData));
    }

    this.GetData()
      .then(data => {
        let dataStr = JSON.stringify(data);
        if (cachedData !== dataStr) {
          this.SiteData.next(data);
          this.setCachedData(dataStr);
        }
      })

  }

  public GetData(): Promise<BasePage> {
    return this.deliveryClient
      .item<BasePage>('cabbys_base_page')
      .depthParameter(10)
      .toPromise()
      .then(response => new Promise((resolve, reject) => {
        if (response.getIsEmpty()) {
          reject('failed to fetch base page.');
        }
        resolve(response.item);
      }));
  }
}
