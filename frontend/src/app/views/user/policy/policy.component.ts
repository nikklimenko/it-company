import {Component, OnInit} from '@angular/core';
import {PolicyAnchorType} from "../../../../types/policy-anchor.type";
import {ActivatedRoute} from "@angular/router";
import {ScrollService} from "../../../shared/services/scroll.service";

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit{
  policyAnchor = PolicyAnchorType;

  constructor(private activatedRoute: ActivatedRoute,
              private scrollService: ScrollService) {
  }

  ngOnInit() {

    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if(fragment === this.policyAnchor.termsOfService){
        this.scrollService.scrollTo(this.policyAnchor.termsOfService);

      } else if(fragment === this.policyAnchor.consentToProcessing){
        this.scrollService.scrollTo(this.policyAnchor.consentToProcessing);
      }
    });

  }

}
