import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TreeItemData } from '../tree-data/tree-item-data';

@Component({
    selector: 'tree-view-item',
    templateUrl: 'app/virtual-tree/tree-view-item/tree-view-item.component.html',
    styleUrls: ['app/virtual-tree/tree-view-item/tree-view-item.component.css'],
    directives: [],
    providers: []
})
export class TreeViewItemComponent implements OnInit {
    @Input() data: TreeItemData;
    @Input() fullHeight: number;
    @Input() indentationSize: number;
    
    @Output() expandItem: EventEmitter<TreeItemData> = new EventEmitter<TreeItemData>();
    @Output() collapseItem: EventEmitter<TreeItemData> = new EventEmitter<TreeItemData>();
    @Output() selectItem: EventEmitter<TreeItemData> = new EventEmitter<TreeItemData>();
    
    icon: string;
    text: string;
    
    private paddingTop: number;
    private paddingLeft: number;
    private allPaddingsString: string;

    constructor() {
        this.expandItem = new EventEmitter<TreeItemData>();
        this.collapseItem = new EventEmitter<TreeItemData>();
        this.selectItem = new EventEmitter<TreeItemData>();

        if (!this.fullHeight || this.fullHeight < 6) { this.fullHeight = 30; }
        if (!this.indentationSize) { this.indentationSize = 16; }
        this.paddingTop = Math.floor(this.fullHeight / 5);
        this.paddingLeft = 0;
        this.allPaddingsString = this.generateAllPaddingsString();
        
        this.icon = null;
        this.text = null;
    }

    ngOnInit() {
        this.paddingLeft = this.data.level * this.indentationSize;
        this.allPaddingsString = this.generateAllPaddingsString();

        this.icon = `[${this.data.type}]`;
        this.text = this.data.name;
    }

    private clickToExpand() {
        this.expandItem.emit(this.data);
    }

    private clickToCollapse() {
        this.collapseItem.emit(this.data);
    }

    private clickToSelect() {
        this.data.isSelected = !this.data.isSelected;
        this.selectItem.emit(this.data);
    }

    private generateAllPaddingsString() {
        return `${this.paddingTop}px 0px 0px ${this.paddingLeft}px`;
    }

}


