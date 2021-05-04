export const allCollections = async () => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
    },
    query: `query Wearables($first: Int, $skip: Int) {\ncollections(first: $first, skip: $skip) {\nid\nname\nowner\nurn\nitems {\nimage\nprice\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

export const storeCollections = async (storeAddress: string = "0x934477ec39ce757e95f5c7dd24562c1d5f5d1cc6") => {
  const result = await fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
      storeAddress: storeAddress,
    },
    query: `query Wearables($first: Int, $skip: Int, $storeAddress: String) {\ncollections(first: $first, skip: $skip, where:{minters_contains:["${storeAddress}"]}) {\nid\nname\nowner\nurn\nitems {\nmetadata{wearable{name}}\nimage\nprice\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}\n}`,
  });
  const json = await result.json();
  return json.data as { collections: Collections };
};

export const collection = async (collectionURN: string) => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
      urn: collectionURN,
    },
    query: `query Wearables($first: Int, $skip: Int, $urn: String) {\ncollections(first: $first, skip: $skip, where:{urn: $urn}) {\nid\nname\nowner\nurn\nitems {\nimage\nprice\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

export const item = async (itemURN: string) => {
  return fetchGraph({
    operationName: "Wearables",
    variables: {
      first: 1000,
      skip: 0,
      urn: itemURN,
    },
    query: `query Wearables($first: Int, $skip: Int, $urn: String) {\nitems(first: $first, skip: $skip, where:{urn: $urn}) {\nimage\nprice\nrarity\navailable\nmaxSupply\nblockchainId\nurn\n}\n}`,
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.data) {
        return r.data;
      } else {
        return r;
      }
    });
};

async function fetchGraph(request: Object) {
  return fetch("https://api.thegraph.com/subgraphs/name/decentraland/collections-matic-mumbai", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

type Collections = {
  id: string;
  items: {
    available: string;
    blockchainId: string;
    image: string;
    maxSupply: string;
    price: string;
    rarity: string;
    urn: string;
    metadata: { wearable: { name: string } };
  }[];
  name: string;
  owner: string;
  urn: string;
}[];
