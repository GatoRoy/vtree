
export interface TreeItemProperties {
    id: string;
    caption: string; 
    type: string;
    level: number;
    children?: TreeItemProperties[];
}
