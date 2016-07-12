import { Component, ViewChild } from '@angular/core';

import { VirtualTreeComponent } from '../virtual-tree/virtual-tree.component';

@Component({
    selector: 'demo-page',
    templateUrl: 'app/demo-page/demo-page.component.html',
    styleUrls: ['app/demo-page/demo-page.component.css'],
    directives: [VirtualTreeComponent],
    providers: []
})
export class DemoTreeViewPageComponent {
    @ViewChild("vtree") vtree: VirtualTreeComponent;
}


