const products_by_category = {
  Foliage: {
    "Colorful leaves": [
      {
        name: "Croton",
        image: require("../assets/images/Foliage/ColorfulLeaves/croton.jpg"),
        cost: "$12.99",
      },
      {
        name: "Calathea",
        image: require("../assets/images/Foliage/ColorfulLeaves/Calathea.jpg"),
        cost: "$14.50",
      },
      {
        name: "Coleus",
        image: require("../assets/images/Foliage/ColorfulLeaves/Coleus.jpg"),
        cost: "$13.75",
      },
      {
        name: "Ti Plant",
        image: require("../assets/images/Foliage/ColorfulLeaves/TiPlant.jpg"),
        cost: "$15.00",
      },
      {
        name: "Polka Dot Plant",
        image: require("../assets/images/Foliage/ColorfulLeaves/PolkaDotPlant.jpg"),
        cost: "$11.99",
      },
      {
        name: "Fittonia",
        image: require("../assets/images/Foliage/ColorfulLeaves/Fittonia.jpg"),
        cost: "$12.25",
      },
      {
        name: "Prayer Plant",
        image: require("../assets/images/Foliage/ColorfulLeaves/PrayerPlant.jpg"),
        cost: "$13.20",
      },
      {
        name: "Begonia Rex",
        image: require("../assets/images/Foliage/ColorfulLeaves/BegoniaRex.jpg"),
        cost: "$14.80",
      },
      {
        name: "Dusty Miller",
        image: require("../assets/images/Foliage/ColorfulLeaves/tresine.jpg"),
        cost: "$13.60",
      },
      {
        name: "Caladium",
        image: require("../assets/images/Foliage/ColorfulLeaves/caladium.jpg"),
        cost: "$15.30",
      },
    ],
    "Green Leaves": [
      {
        name: "Ficus",
        image: require("../assets/images/Foliage/GreenLeaves/Monstera.jpg"),
        cost: "$15.99",
      },
      {
        name: "Philodendron",
        image: require("../assets/images/Foliage/GreenLeaves/Philodendron.jpg"),
        cost: "$14.00",
      },
      {
        name: "Monstera",
        image: require("../assets/images/Foliage/GreenLeaves/Monstera.jpg"),
        cost: "$16.50",
      },
      {
        name: "Snake Plant",
        image: require("../assets/images/Foliage/GreenLeaves/SnakePlant.jpg"),
        cost: "$12.50",
      },
      {
        name: "Rubber Plant",
        image: require("../assets/images/Foliage/GreenLeaves/RubberPlant.jpg"),
        cost: "$17.00",
      },
      {
        name: "ZZ Plant",
        image: require("../assets/images/Foliage/GreenLeaves/ZZPlant.jpg"),
        cost: "$13.90",
      },
      {
        name: "Pothos",
        image: require("../assets/images/Foliage/GreenLeaves/Pothos.jpg"),
        cost: "$11.75",
      },
      {
        name: "Aspidistra",
        image: require("../assets/images/Foliage/GreenLeaves/Aspidistra.jpg"),
        cost: "$14.40",
      },
      {
        name: "Chinese Evergreen",
        image: require("../assets/images/Foliage/GreenLeaves/ChineseEvergreen.jpg"),
        cost: "$15.20",
      },
      {
        name: "Bird's Nest Fern",
        image: require("../assets/images/Foliage/GreenLeaves/BirdsNestFern.jpg"),
        cost: "$16.10",
      },
    ],
    "Desk Plants": [
      {
        name: "Succulent",
        image: require("../assets/images/Foliage/DeskPlants/Succulent.jpg"),
        cost: "$9.99",
      },
      {
        name: "Air Plant",
        image: require("../assets/images/Foliage/DeskPlants/AirPlant.jpg"),
        cost: "$8.50",
      },
      {
        name: "Lucky Bamboo",
        image: require("../assets/images/Foliage/DeskPlants/LuckyBamboo.jpg"),
        cost: "$10.00",
      },
      {
        name: "Cactus",
        image: require("../assets/images/Foliage/DeskPlants/Cactus.jpg"),
        cost: "$7.99",
      },
      {
        name: "Mini Fern",
        image: require("../assets/images/Foliage/DeskPlants/MiniFern.jpg"),
        cost: "$9.50",
      },
      {
        name: "Air Fern",
        image: require("../assets/images/Foliage/DeskPlants/AirFern.jpg"),
        cost: "$8.75",
      },
      {
        name: "Pilea",
        image: require("../assets/images/Foliage/DeskPlants/Pilea.jpg"),
        cost: "$11.00",
      },
      {
        name: "Mini Aloe",
        image: require("../assets/images/Foliage/DeskPlants/miniAloe.jpg"),
        cost: "$10.50",
      },
      {
        name: "Tillandsia",
        image: require("../assets/images/Foliage/DeskPlants/Tillandsia.jpg"),
        cost: "$9.25",
      },
      {
        name: "Spider Plant",
        image: require("../assets/images/Foliage/DeskPlants/SpiderPlant.jpg"),
        cost: "$12.00",
      },
    ],
    "Air Purifying": [
      {
        name: "Peace Lily",
        image: require("../assets/images/Foliage/AirPurifying/Peacelily.jpg"),
        cost: "$20.00",
      },
      {
        name: "Spider Plant",
        image: require("../assets/images/Foliage/AirPurifying/SpiderPlant.jpg"),
        cost: "$18.50",
      },
      {
        name: "Boston Fern",
        image: require("../assets/images/Foliage/AirPurifying/BostonFern.jpg"),
        cost: "$19.00",
      },
      {
        name: "Rubber Plant",
        image: require("../assets/images/Foliage/AirPurifying/RubberPlant.jpg"),
        cost: "$21.00",
      },
      {
        name: "Snake Plant",
        image: require("../assets/images/Foliage/AirPurifying/SnakePlant.jpg"),
        cost: "$17.99",
      },
      {
        name: "Areca Palm",
        image: require("../assets/images/Foliage/AirPurifying/ArecaPalm.jpg"),
        cost: "$20.50",
      },
      {
        name: "Chinese Evergreen",
        image: require("../assets/images/Foliage/AirPurifying/ChineseEvergreen.jpg"),
        cost: "$19.80",
      },
      {
        name: "Weeping Fig",
        image: require("../assets/images/Foliage/AirPurifying/WeepingFig.jpg"),
        cost: "$22.00",
      },
      {
        name: "Dracaena",
        image: require("../assets/images/Foliage/AirPurifying/Dracaena.jpg"),
        cost: "$21.50",
      },
      {
        name: "Golden Pothos",
        image: require("../assets/images/Foliage/AirPurifying/GoldenPothos.jpg"),
        cost: "$18.20",
      },
    ],
    "Hanging Plants": [
      {
        name: "String of Pearls",
        image: require("../assets/images/Foliage/HangingPlants/StringofPearls.jpg"),
        cost: "$18.50",
      },
      {
        name: "Boston Fern",
        image: require("../assets/images/Foliage/HangingPlants/BostonFern.jpg"),
        cost: "$17.00",
      },
      {
        name: "English Ivy",
        image: require("../assets/images/Foliage/HangingPlants/EnglishIvy.jpg"),
        cost: "$16.80",
      },
      {
        name: "Spider Plant",
        image: require("../assets/images/Foliage/HangingPlants/SpiderPlant.jpg"),
        cost: "$15.90",
      },
      {
        name: "Lipstick Plant",
        image: require("../assets/images/Foliage/HangingPlants/LipstickPlant.jpg"),
        cost: "$19.00",
      },
      {
        name: "Maidenhair Fern",
        image: require("../assets/images/Foliage/HangingPlants/MaidenhairFern.jpg"),
        cost: "$14.80",
      },
      {
        name: "Hoya",
        image: require("../assets/images/Foliage/HangingPlants/Hoya.jpg"),
        cost: "$17.50",
      },
      {
        name: "Variegated Spiderwort",
        image: require("../assets/images/Foliage/HangingPlants/VariegatedSpiderwort.jpg"),
        cost: "$16.20",
      },
      {
        name: "String of Hearts",
        image: require("../assets/images/Foliage/HangingPlants/StringofHearts.jpg"),
        cost: "$19.50",
      },
    ],
  },
  Flowers: {
    Shrubs: [
      {
        name: "Azalea",
        image: require("../assets/images/Flowers/Shrubs/Azalea.jpg"),
        cost: "$25.00",
      },
      {
        name: "Hydrangea",
        image: require("../assets/images/Flowers/Shrubs/Hydrangea.jpg"),
        cost: "$28.00",
      },
      {
        name: "Camellia",
        image: require("../assets/images/Flowers/Shrubs/Camellia.jpg"),
        cost: "$27.50",
      },
      {
        name: "Forsythia",
        image: require("../assets/images/Flowers/Shrubs/Forsythia.jpg"),
        cost: "$24.50",
      },
      {
        name: "Blue Plumbago",
        image: require("../assets/images/Flowers/Shrubs/BluePlumbago.jpg"),
        cost: "$26.00",
      },
      {
        name: "Buttercup",
        image: require("../assets/images/Flowers/Shrubs/Buttercup.jpg"),
        cost: "$22.50",
      },
      {
        name: "Heather",
        image: require("../assets/images/Flowers/Shrubs/Heather.jpg"),
        cost: "$23.00",
      },
      {
        name: "Rhododendron",
        image: require("../assets/images/Flowers/Shrubs/Rhododendron.jpg"),
        cost: "$29.00",
      },
      {
        name: "Lilac",
        image: require("../assets/images/Flowers/Shrubs/Lilac.jpg"),
        cost: "$30.00",
      },
      {
        name: "Spirea",
        image: require("../assets/images/Flowers/Shrubs/Spirea.jpg"),
        cost: "$21.00",
      },
    ],
    "Climbers/Vine": [
      {
        name: "Wisteria",
        image: require("../assets/images/Flowers/Climbers/Wisteria.jpg"),
        cost: "$31.00",
      },
      {
        name: "Bougainvillea",
        image: require("../assets/images/Flowers/Climbers/Bougainvillea.jpg"),
        cost: "$28.50",
      },
      {
        name: "Jasmine",
        image: require("../assets/images/Flowers/Climbers/Jasmine.jpg"),
        cost: "$25.00",
      },
      {
        name: "Honeysuckle",
        image: require("../assets/images/Flowers/Climbers/Honeysuckle.jpg"),
        cost: "$27.50",
      },
      {
        name: "Clematis",
        image: require("../assets/images/Flowers/Climbers/Clematis.jpg"),
        cost: "$29.00",
      },
      {
        name: "Morning Glory",
        image: require("../assets/images/Flowers/Climbers/MorningGlory.jpg"),
        cost: "$26.00",
      },
      {
        name: "Sweet Pea",
        image: require("../assets/images/Flowers/Climbers/SweetPea.jpg"),
        cost: "$24.00",
      },
      {
        name: "Passionflower",
        image: require("../assets/images/Flowers/Climbers/Passionflower.jpg"),
        cost: "$30.00",
      },
      {
        name: "Trumpet Vine",
        image: require("../assets/images/Flowers/Climbers/TrumpetVine.jpg"),
        cost: "$27.50",
      },
      {
        name: "Black-eyed Susan Vine",
        image: require("../assets/images/Flowers/Climbers/BlackEyedSusan.jpg"),
        cost: "$25.50",
      },
    ],
    Fragrant: [
      {
        name: "Lavender",
        image: require("../assets/images/Flowers/Fragrant/Lavender.jpg"),
        cost: "$22.50",
      },
      {
        name: "Jasmine",
        image: require("../assets/images/Flowers/Fragrant/Jasmine.jpg"),
        cost: "$24.00",
      },
      {
        name: "Gardenia",
        image: require("../assets/images/Flowers/Fragrant/Gardenia.jpg"),
        cost: "$23.50",
      },
      {
        name: "Rose",
        image: require("../assets/images/Flowers/Fragrant/Rose.jpg"),
        cost: "$25.00",
      },
      {
        name: "Sweet Pea",
        image: require("../assets/images/Flowers/Fragrant/SweetPea.jpg"),
        cost: "$22.80",
      },
      {
        name: "Freesia",
        image: require("../assets/images/Flowers/Fragrant/Freesia.jpg"),
        cost: "$21.50",
      },
      {
        name: "Lilac",
        image: require("../assets/images/Flowers/Fragrant/Lilac.jpg"),
        cost: "$23.00",
      },
      {
        name: "Carnation",
        image: require("../assets/images/Flowers/Fragrant/Carnation.jpg"),
        cost: "$20.50",
      },
      {
        name: "Tuberose",
        image: require("../assets/images/Flowers/Fragrant/Tuberose.jpg"),
        cost: "$22.00",
      },
      {
        name: "Magnolia",
        image: require("../assets/images/Flowers/Fragrant/Magnolia.jpg"),
        cost: "$23.50",
      },
    ],
    "Seasonal/Decorative": [
      {
        name: "Rose",
        image: require("../assets/images/Flowers/Seasonal/Rose.jpg"),
        cost: "$12.50",
      },
      {
        name: "Tulip",
        image: require("../assets/images/Flowers/Seasonal/Tulip.jpg"),
        cost: "$10.00",
      },
      {
        name: "Carnation",
        image: require("../assets/images/Flowers/Seasonal/Carnation.jpg"),
        cost: "$11.00",
      },
      {
        name: "Lily",
        image: require("../assets/images/Flowers/Seasonal/Lily.jpg"),
        cost: "$13.00",
      },
      {
        name: "Orchid",
        image: require("../assets/images/Flowers/Seasonal/Orchid.jpg"),
        cost: "$15.00",
      },
      {
        name: "Sunflower",
        image: require("../assets/images/Flowers/Seasonal/Sunflower.jpg"),
        cost: "$9.50",
      },
      {
        name: "Daisy",
        image: require("../assets/images/Flowers/Seasonal/Daisy.jpg"),
        cost: "$8.75",
      },
      {
        name: "Gladiolus",
        image: require("../assets/images/Flowers/Seasonal/Gladiolus.jpg"),
        cost: "$12.00",
      },
      {
        name: "Chrysanthemum",
        image: require("../assets/images/Flowers/Seasonal/Chrysanthemum.jpg"),
        cost: "$11.50",
      },
      {
        name: "Peony",
        image: require("../assets/images/Flowers/Seasonal/Peony.jpg"),
        cost: "$14.00",
      },
    ],
  },
};

const products = {};
let counter = 1;

for (const [category, subcats] of Object.entries(products_by_category)) {
  for (const [subcategory, items] of Object.entries(subcats)) {
    for (const item of items) {
      const item_id = `p${counter}`;
      products[item_id] = {
        name: item.name,
        image: item.image,
        cost: item.cost,
        category,
        subcategory,
      };
      counter++;
    }
  }
}

console.log(products);

export { products_by_category };
