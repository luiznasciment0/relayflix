/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FormSearchQueryVariables = {
    title: string;
};
export type FormSearchQueryResponse = {
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
export type FormSearchQuery = {
    readonly response: FormSearchQueryResponse;
    readonly variables: FormSearchQueryVariables;
};



/*
query FormSearchQuery(
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
    "name": "FormSearchQuery",
    "selections": (v2/*: any*/),
    "type": "RootQuery",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FormSearchQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7a0ceba6dd7867b6beb9f69bf9ae7377",
    "id": null,
    "metadata": {},
    "name": "FormSearchQuery",
    "operationKind": "query",
    "text": "query FormSearchQuery(\n  $title: String!\n) {\n  videosByTitle(title: $title) {\n    items {\n      _id: id {\n        kind\n        videoId\n      }\n      snippet {\n        title\n      }\n    }\n  }\n  moviesByTitle(title: $title) {\n    Search {\n      Title\n      Year\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5fbdeb362ea0e01613063bbd76345b20';
export default node;
