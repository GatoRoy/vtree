import { Component } from '@angular/core';

import { DemoTreeViewPageComponent } from './demo-page/demo-page.component';

@Component({
    selector: 'main-app',
    template: `
    <h1>Demo of Virtual Tree View component</h1>
    <demo-page></demo-page>
    `,
    directives: [DemoTreeViewPageComponent]
})
export class AppComponent { }
