import { Component } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl, CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const TREE_DATA: ExampleFlatNode[] = [
  {
    name: 'Category A',
    expandable: true,
    level: 0,
    isExpanded: true,
  },
  {
    name: 'Aaaa: 158',
    expandable: false,
    level: 1,
  },
  {
    name: 'Cccc: 654',
    expandable: false,
    level: 1,
  },
  {
    name: 'Category B',
    expandable: true,
    level: 0,
    isExpanded: true,
  },
  {
    name: 'Zzzzz: 1',
    expandable: false,
    level: 1,
  },
  {
    name: 'General (no category)',
    expandable: true,
    level: 0,
    isExpanded: true,
  },
  {
    name: 'Dddd: 456',
    expandable: false,
    level: 1,
  },
  {
    name: 'Eeee: 987',
    expandable: false,
    level: 1,
  },
  {
    name: 'Fffff: 5456',
    expandable: false,
    level: 1,
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'cdk-tree-flat-example',
  templateUrl: 'cdk-tree-flat-example.html',
  styleUrls: ['cdk-tree-flat-example.css'],
  standalone: true,
  imports: [CdkTreeModule, MatButtonModule, MatIconModule],
})
export class CdkTreeFlatExample {
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: ExampleFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
