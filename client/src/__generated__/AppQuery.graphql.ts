/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AppQueryVariables = {
    title: string;
};
export type AppQueryResponse = {
    readonly videosByTitle: {
        readonly items: ReadonlyArray<{
            readonly _id: {
                readonly kind: string;
                readonly videoId: string;
            };
            readonly snippet: {
                readonly title: string;
            };
        } | null>;
    } | null;
    readonly moviesByTitle: {
        readonly Search: ReadonlyArray<{
            readonly Title: string;
            readonly Year: string;
        } | null>;
    } | null;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery(
  $title: String!
) {
  videosByTitle(title: $title) {
    items {
      _id: id {
        kind
        videoId
      }
      snippet {
        title
      }
    }
  }
  moviesByTitle(title: $title) {
    Search {
      Title
      Year
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "title"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
  }
],
v2 = [
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "VideosQueryType",
    "kind": "LinkedField",
    "name": "videosByTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Video",
        "kind": "LinkedField",
        "name": "items",
        "plural": true,
        "selections": [
          {
            "alias": "_id",
            "args": null,
            "concreteType": "VideoID",
            "kind": "LinkedField",
            "name": "id",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "kind",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "videoId",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Snippet",
            "kind": "LinkedField",
            "name": "snippet",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "MoviesQueryType",
    "kind": "LinkedField",
    "name": "moviesByTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Movie",
        "kind": "LinkedField",
        "name": "Search",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "Title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "Year",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": (v2/*: any*/),
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "521617dfd249aa76837acb3118d61dba",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery(\n  $title: String!\n) {\n  videosByTitle(title: $title) {\n    items {\n      _id: id {\n        kind\n        videoId\n      }\n      snippet {\n        title\n      }\n    }\n  }\n  moviesByTitle(title: $title) {\n    Search {\n      Title\n      Year\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'aa5423498eba81a6aa0967fccb4d9ab4';
export default node;
