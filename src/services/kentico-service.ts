import { DeliveryClient, TypeResolver } from '@kentico/kontent-delivery';
import { BasePage } from '../models/KenticoModels';

export default class KenticoService {
  private deliveryClient: DeliveryClient;

  constructor() {
    this.deliveryClient = new DeliveryClient({
      projectId: 'cdceeea5-2b9a-00d7-1815-baf8514b167a',
      typeResolvers: [
        new TypeResolver('base_page', data => new BasePage(data))
      ]
    });
  }

  // Get all Data for KC
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
