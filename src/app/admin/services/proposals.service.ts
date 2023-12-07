import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {

  proposals: any[] = [
    {
      
    }
  ];
  constructor() { }

  addProposals( data: any ) {
    this.proposals.push( data );
  }
  
}
