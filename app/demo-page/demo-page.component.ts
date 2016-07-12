import { Component, ViewChild } from '@angular/core';

import { VirtualTreeComponent } from '../virtual-tree/virtual-tree.component';
import { DemoTreeDataService } from '../demo-tree-data-service/demo-tree-data.service';

@Component({
    selector: 'demo-page',
    templateUrl: 'app/demo-page/demo-page.component.html',
    styleUrls: ['app/demo-page/demo-page.component.css'],
    directives: [VirtualTreeComponent],
    providers: []
})
export class DemoTreeViewPageComponent {
    @ViewChild("vtree") vtree: VirtualTreeComponent;

    private demoTreeDataService: DemoTreeDataService;

    constructor() {
        this.demoTreeDataService = new DemoTreeDataService();
    }
}


