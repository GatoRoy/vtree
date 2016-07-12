import { Component, OnInit, OnChanges, ChangeDetectionStrategy, SimpleChange, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { TreeItemData } from '../tree-data/tree-item-data';
import { RenderableTreeData } from '../tree-data/renderable-tree-data';
import { TreeViewItemComponent } from '../tree-view-item/tree-view-item.component';

@Component({
    selector: 'tree-view',
    templateUrl: 'app/virtual-tree/tree-view/tree-view.component.html',
    styleUrls: ['app/virtual-tree/tree-view/tree-view.component.css'],
    directives: [TreeViewItemComponent],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent implements OnInit, OnChanges {
    @Input() data: RenderableTreeData;
    @Input() treeItemHeight: number;
    @Input() treeItemIndentationSize: number;
    
    @Output() onScroll: EventEmitter<number>;
    @Output() onExpand: EventEmitter<RenderableTreeData>;
    @Output() onCollapse: EventEmitter<RenderableTreeData>;
    @Output() onSelect: EventEmitter<TreeItemData>;
    
    private beforeAreaHeight: number;
    private afterAreaHeight: number;
    
    @ViewChild("treeVisibleView") treeVisibleView: ElementRef;

    constructor() {
        this.onScroll = new EventEmitter<number>();
        this.onExpand = new EventEmitter<RenderableTreeData>();
        this.onCollapse = new EventEmitter<RenderableTreeData>();
        this.onSelect = new EventEmitter<TreeItemData>();

        if (!this.treeItemHeight) { this.treeItemHeight = 30; }
        this.beforeAreaHeight = 0;
        this.afterAreaHeight = 0;
    }

    private amountOfVisibleItems: number = null;
    private _amountOfItemsToRender: number = null;
    get amountOfItemsToRender(): number {
        if (!this._amountOfItemsToRender) {
            this.amountOfVisibleItems = this.calculateAmountOfVisibleItems();
            this._amountOfItemsToRender = this.amountOfVisibleItems * 3;
        }
        return this._amountOfItemsToRender;
    }
    
    ngOnInit() {
        this.setHeightsOfAreas(0);
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        let dataChange: SimpleChange = changes['data'];
        let currentData = dataChange.currentValue;
        if (currentData !== dataChange.previousValue) {
            this.setHeightsOfAreas(currentData.indexOfFirstItemToRender);
        }
    }

    private calculateAmountOfVisibleItems(): number {
        let visibleHeight = this.getVisibleHeight();
        return Math.ceil(visibleHeight / this.treeItemHeight);
    }

    private getVisibleHeight(): number {
        let containerHeight = this.treeVisibleView.nativeElement.clientHeight;
        return containerHeight;
    }

    private setHeightsOfAreas(indexOfFirstItemToRender: number): void {
        let totalInnerHeight = this.calculateTotalInnerHeight();
        let heightOfRenderedItems = this.calculateHeightOfRenderedItems();
        this.beforeAreaHeight = indexOfFirstItemToRender * this.treeItemHeight;
        this.afterAreaHeight = totalInnerHeight - this.beforeAreaHeight - heightOfRenderedItems;
    }

    private calculateTotalInnerHeight(): number {
        return this.data.amountOfScrollableItems * this.treeItemHeight;
    }

    private calculateHeightOfRenderedItems(): number {
        return this.data.items.length * this.treeItemHeight;
    }

    private scrollToItem() {
        let indexOfFirstItemToRender = this.getIndexOfFirstItemToRender();
        this.onScroll.emit(indexOfFirstItemToRender);
    }

    private getIndexOfFirstItemToRender(): number {
        let firstVisibleItemIndex = Math.floor(this.treeVisibleView.nativeElement.scrollTop / this.treeItemHeight);
        return Math.max(0, firstVisibleItemIndex - this.amountOfVisibleItems);
    }

    private expandDataItem(dataItem: TreeItemData) {
        let treeData: RenderableTreeData = {
            items: [dataItem],
            indexOfFirstItemToRender: this.getIndexOfFirstItemToRender()
        };
        this.onExpand.emit(treeData);
    }

    private collapseDataItem(dataItem: TreeItemData) {
        let treeData: RenderableTreeData = {
            items: [dataItem],
            indexOfFirstItemToRender: this.getIndexOfFirstItemToRender()
        };
        this.onCollapse.emit(treeData);
    }

    private selectDataItem(dataItem: TreeItemData) {
        this.onSelect.emit(dataItem);
    }

}


