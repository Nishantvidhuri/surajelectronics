import React, { createContext, useContext, useState } from "react";

// Sample Data Object
const data = [
  {
      "name": "ACER",
      "shelfNumber": "7",
      "image": "/photos/ACER_7.jpeg"
  },
  {
      "name": "BPL 1",
      "shelfNumber": "67",
      "image": "/photos/BPL-1_67.jpeg"
  },
  {
      "name": "BPL 2",
      "shelfNumber": "67",
      "image": "/photos/BPL-2_67.jpeg"
  },
  {
      "name": "CH 02",
      "shelfNumber": "6",
      "image": "/photos/CH-02_6.jpeg"
  },
  {
      "name": "CH 03",
      "shelfNumber": "56",
      "image": "/photos/CH-03_56.jpeg"
  },
  {
      "name": "CH 100",
      "shelfNumber": "16",
      "image": "/photos/CH-100_16.jpeg"
  },
  {
      "name": "CH 107",
      "shelfNumber": "7",
      "image": "/photos/CH-107_7.jpeg"
  },
  {
      "name": "CH 118",
      "shelfNumber": "16",
      "image": "/photos/CH-118_16.jpeg"
  },
  {
      "name": "CH 120",
      "shelfNumber": "12",
      "image": "/photos/CH-120_12.jpeg"
  },
  {
      "name": "CH 122",
      "shelfNumber": "9",
      "image": "/photos/CH-122_9.jpeg"
  },
  {
      "name": "CH 133OSCAR",
      "shelfNumber": "5",
      "image": "/photos/CH-133OSCAR_5.jpeg"
  },
  {
      "name": "CH 134",
      "shelfNumber": "63",
      "image": "/photos/CH-134_63.jpeg"
  },
  {
      "name": "CH 136",
      "shelfNumber": "8",
      "image": "/photos/CH-136_8.jpeg"
  },
  {
      "name": "CH 138",
      "shelfNumber": "3",
      "image": "/photos/CH-138_3.jpeg"
  },
  {
      "name": "CH 139",
      "shelfNumber": "60",
      "image": "/photos/CH-139_60.jpeg"
  },
  {
      "name": "CH 141",
      "shelfNumber": "55",
      "image": "/photos/CH-141_55.jpeg"
  },
  {
      "name": "CH 143",
      "shelfNumber": "55",
      "image": "/photos/CH-143_55.jpeg"
  },
  {
      "name": "CH 144",
      "shelfNumber": "52",
      "image": "/photos/CH-144_52.jpeg"
  },
  {
      "name": "CH 151",
      "shelfNumber": "68",
      "image": "/photos/CH-151_68.jpeg"
  },
  {
      "name": "CH 156",
      "shelfNumber": "52",
      "image": "/photos/CH-156_52.jpeg"
  },
  {
      "name": "CH 158",
      "shelfNumber": "53",
      "image": "/photos/CH-158_53.jpeg"
  },
  {
      "name": "CH 158",
      "shelfNumber": "54",
      "image": "/photos/CH-158_54.jpeg"
  },
  {
      "name": "CH 159",
      "shelfNumber": "19",
      "image": "/photos/CH-159_19.jpeg"
  },
  {
      "name": "CH 160",
      "shelfNumber": "26",
      "image": "/photos/CH-160_26.jpeg"
  },
  {
      "name": "CH 161",
      "shelfNumber": "19",
      "image": "/photos/CH-161_19.jpeg"
  },
  {
      "name": "CH 169",
      "shelfNumber": "17",
      "image": "/photos/CH-169_17.jpeg"
  },
  {
      "name": "CH 169",
      "shelfNumber": "66",
      "image": "/photos/CH-169_66.jpeg"
  },
  {
      "name": "CH 170",
      "shelfNumber": "35",
      "image": "/photos/CH-170_35.jpeg"
  },
  {
      "name": "CH 172",
      "shelfNumber": "52",
      "image": "/photos/CH-172_52.jpeg"
  },
  {
      "name": "CH 174",
      "shelfNumber": "7",
      "image": "/photos/CH-174_7.jpeg"
  },
  {
      "name": "CH 178",
      "shelfNumber": "8",
      "image": "/photos/CH-178_8.jpeg"
  },
  {
      "name": "CH 181",
      "shelfNumber": "67",
      "image": "/photos/CH-181_67.jpeg"
  },
  {
      "name": "CH 182",
      "shelfNumber": "57",
      "image": "/photos/CH-182_57.jpeg"
  },
  {
      "name": "CH 185",
      "shelfNumber": "61",
      "image": "/photos/CH-185_61.jpeg"
  },
  {
      "name": "CH 186",
      "shelfNumber": "59",
      "image": "/photos/CH-186_59.jpeg"
  },
  {
      "name": "CH 18",
      "shelfNumber": "51",
      "image": "/photos/CH-18_51.jpeg"
  },
  {
      "name": "CH 190",
      "shelfNumber": "32",
      "image": "/photos/CH-190_32.jpeg"
  },
  {
      "name": "CH 23",
      "shelfNumber": "2",
      "image": "/photos/CH-23_2.jpg"
  },
  {
      "name": "CH 256",
      "shelfNumber": "9",
      "image": "/photos/CH-256_9.jpeg"
  },
  {
      "name": "CH 28",
      "shelfNumber": "29",
      "image": "/photos/CH-28_29.jpeg"
  },
  {
      "name": "CH 34",
      "shelfNumber": "5",
      "image": "/photos/CH-34_5.jpeg"
  },
  {
      "name": "CH 39",
      "shelfNumber": "49",
      "image": "/photos/CH-39_49.jpeg"
  },
  {
      "name": "CH 40",
      "shelfNumber": "10",
      "image": "/photos/CH-40_10.jpeg"
  },
  {
      "name": "CH 43",
      "shelfNumber": "49",
      "image": "/photos/CH-43_49.jpeg"
  },
  {
      "name": "CH 55",
      "shelfNumber": "35",
      "image": "/photos/CH-55_35.jpeg"
  },
  {
      "name": "CH 65",
      "shelfNumber": "2",
      "image": "/photos/CH-65_2.jpg"
  },
  {
      "name": "CH 69AKAITCL",
      "shelfNumber": "5",
      "image": "/photos/CH-69AKAITCL_5.jpeg"
  },
  {
      "name": "CH 85",
      "shelfNumber": "61",
      "image": "/photos/CH-85_61.jpeg"
  },
  {
      "name": "CH 87",
      "shelfNumber": "12",
      "image": "/photos/CH-87_12.jpeg"
  },
  {
      "name": "CH 93",
      "shelfNumber": "6",
      "image": "/photos/CH-93_6.jpeg"
  },
  {
      "name": "CHROMA CH 90",
      "shelfNumber": "57",
      "image": "/photos/CHROMA-CH-90_57.jpeg"
  },
  {
      "name": "Firestick",
      "shelfNumber": "1",
      "image": "/photos/firestick_1.png"
  },
  {
      "name": "HAIER SMART",
      "shelfNumber": "74",
      "image": "/photos/HAIER-SMART_74.jpeg"
  },
  {
      "name": "HAIER VOICE",
      "shelfNumber": "74",
      "image": "/photos/HAIER-VOICE_74.jpeg"
  },
  {
      "name": "HAIER",
      "shelfNumber": "66",
      "image": "/photos/HAIER_66.jpeg"
  },
  {
      "name": "HAIER",
      "shelfNumber": "74",
      "image": "/photos/HAIER_74.jpeg"
  },
  {
      "name": "HOMETHEATER MULTI",
      "shelfNumber": "11",
      "image": "/photos/HOMETHEATER-MULTI_11.jpeg"
  },
  {
      "name": "HOMETHEATER",
      "shelfNumber": "11",
      "image": "/photos/HOMETHEATER_11.jpeg"
  },
  {
      "name": "HYUNDAI CH 88",
      "shelfNumber": "74",
      "image": "/photos/HYUNDAI-CH-88_74.jpeg"
  },
  {
      "name": "INTEX CH 14",
      "shelfNumber": "41",
      "image": "/photos/INTEX-CH-14_41.jpeg"
  },
  {
      "name": "INTEX CH 45",
      "shelfNumber": "59",
      "image": "/photos/INTEX-CH-45_59.jpeg"
  },
  {
      "name": "JIO VOICE",
      "shelfNumber": "45",
      "image": "/photos/JIO-VOICE_45.jpeg"
  },
  {
      "name": "JIO",
      "shelfNumber": "83",
      "image": "/photos/JIO_83.jpeg"
  },
  {
      "name": "KODAK THOMSON",
      "shelfNumber": "46",
      "image": "/photos/KODAK-THOMSON_46.jpeg"
  },
  {
      "name": "LE TV CH 271",
      "shelfNumber": "84",
      "image": "/photos/LE-TV-CH-271_84.jpeg"
  },
  {
      "name": "LG MAGIC",
      "shelfNumber": "28",
      "image": "/photos/LG-MAGIC_28.jpeg"
  },
  {
      "name": "LG TV",
      "shelfNumber": "81",
      "image": "/photos/LG-TV_81.jpeg"
  },
  {
      "name": "LLOYD 1",
      "shelfNumber": "99",
      "image": "/photos/LLOYD-1_99.jpeg"
  },
  {
      "name": "LLOYD 2",
      "shelfNumber": "99",
      "image": "/photos/LLOYD-2_99.jpeg"
  },
  {
      "name": "LLOYD CH 09",
      "shelfNumber": "27",
      "image": "/photos/LLOYD-CH-09_27.jpeg"
  },
  {
      "name": "LLOYD CH 163",
      "shelfNumber": "22",
      "image": "/photos/LLOYD-CH-163_22.jpeg"
  },
  {
      "name": "LLOYD VU",
      "shelfNumber": "77",
      "image": "/photos/LLOYD-VU_77.jpeg"
  },
  {
      "name": "LLOYD1",
      "shelfNumber": "8",
      "image": "/photos/LLOYD1_8.jpeg"
  },
  {
      "name": "LLOYD",
      "shelfNumber": "77",
      "image": "/photos/LLOYD_77.jpeg"
  },
  {
      "name": "LLOYD",
      "shelfNumber": "8",
      "image": "/photos/LLOYD_8.jpeg"
  },
  {
      "name": "MI VOICE",
      "shelfNumber": "21",
      "image": "/photos/MI-VOICE_21.jpeg"
  },
  {
      "name": "MI WITHOUT VOICE",
      "shelfNumber": "46",
      "image": "/photos/MI-WITHOUT-VOICE_46.jpeg"
  },
  {
      "name": "MICROMAX 1",
      "shelfNumber": "90",
      "image": "/photos/MICROMAX-1_90.jpeg"
  },
  {
      "name": "MICROMAX 2",
      "shelfNumber": "89",
      "image": "/photos/MICROMAX-2_89.jpeg"
  },
  {
      "name": "MULTI SMART CH 1462",
      "shelfNumber": "39",
      "image": "/photos/MULTI-SMART-CH-1462_39.jpeg"
  },
  {
      "name": "MULTISMART",
      "shelfNumber": "11",
      "image": "/photos/MULTISMART_11.jpeg"
  },
  {
      "name": "NOKIA",
      "shelfNumber": "74",
      "image": "/photos/NOKIA_74.jpeg"
  },
  {
      "name": "ONE PLUS",
      "shelfNumber": "61",
      "image": "/photos/ONE-PLUS_61.jpeg"
  },
  {
      "name": "ONIDA 1",
      "shelfNumber": "50",
      "image": "/photos/ONIDA-1_50.jpeg"
  },
  {
      "name": "ONIDA 2",
      "shelfNumber": "50",
      "image": "/photos/ONIDA-2_50.jpeg"
  },
  {
      "name": "PANASONIC",
      "shelfNumber": "64",
      "image": "/photos/PANASONIC_64.jpeg"
  },
  {
      "name": "PANASONIC",
      "shelfNumber": "71",
      "image": "/photos/PANASONIC_71.jpeg"
  },
  {
      "name": "PHILIPS 1",
      "shelfNumber": "20",
      "image": "/photos/PHILIPS-1_20.jpeg"
  },
  {
      "name": "PHILIPS 2",
      "shelfNumber": "20",
      "image": "/photos/PHILIPS-2_20.jpeg"
  },
  {
      "name": "PHILIPS HOMETHEATER",
      "shelfNumber": "53",
      "image": "/photos/PHILIPS-HOMETHEATER_53.jpeg"
  },
  {
      "name": "REALME VOICE",
      "shelfNumber": "37",
      "image": "/photos/REALME-VOICE_37.jpeg"
  },
  {
      "name": "REALME WITHOUT VOICE",
      "shelfNumber": "60",
      "image": "/photos/REALME-WITHOUT-VOICE_60.jpeg"
  },
  {
      "name": "RECONNECT 1 LED 35",
      "shelfNumber": "33",
      "image": "/photos/RECONNECT-1-LED-35_33.jpeg"
  },
  {
      "name": "RECONNECT",
      "shelfNumber": "33",
      "image": "/photos/RECONNECT_33.jpeg"
  },
  {
      "name": "SAMSUNG",
      "shelfNumber": "75",
      "image": "/photos/SAMSUNG_75.jpeg"
  },
  {
      "name": "SANSUI 2",
      "shelfNumber": "48",
      "image": "/photos/SANSUI-2_48.jpeg"
  },
  {
      "name": "SANSUI",
      "shelfNumber": "48",
      "image": "/photos/SANSUI_48.jpeg"
  },
  {
      "name": "SANYO CH 29",
      "shelfNumber": "51",
      "image": "/photos/SANYO-CH-29_51.jpeg"
  },
  {
      "name": "SMART",
      "shelfNumber": "9",
      "image": "/photos/SMART_9.jpeg"
  },
  {
      "name": "SOLID",
      "shelfNumber": "2",
      "image": "/photos/SOLID_2.jpg"
  },
  {
      "name": "SONY CAPSULE",
      "shelfNumber": "53",
      "image": "/photos/SONY-CAPSULE_53.jpeg"
  },
  {
      "name": "SONY LONG",
      "shelfNumber": "70",
      "image": "/photos/SONY-LONG_70.jpeg"
  },
  {
      "name": "SONY VOICE",
      "shelfNumber": "23",
      "image": "/photos/SONY-VOICE_23.jpeg"
  },
  {
      "name": "SUNDIRECT 1",
      "shelfNumber": "13",
      "image": "/photos/SUNDIRECT-1_13.jpeg"
  },
  {
      "name": "TCL",
      "shelfNumber": "62",
      "image": "/photos/TCL_62.jpeg"
  },
  {
      "name": "TOSHIBATS 10",
      "shelfNumber": "18",
      "image": "/photos/TOSHIBATS-10_18.jpeg"
  },
  {
      "name": "UNKNOWN",
      "shelfNumber": "19",
      "image": "/photos/UNKNOWN_19.jpeg"
  },
  {
      "name": "UNKNOWN",
      "shelfNumber": "49",
      "image": "/photos/UNKNOWN_49.jpeg"
  },
  {
      "name": "USB REMOTE",
      "shelfNumber": "80",
      "image": "/photos/USB-REMOTE_80.jpeg"
  },
  {
      "name": "USB REMOTE",
      "shelfNumber": "88",
      "image": "/photos/USB-REMOTE_88.jpeg"
  },
  {
      "name": "VU 1",
      "shelfNumber": "47",
      "image": "/photos/VU-1_47.jpeg"
  },
  {
      "name": "VU",
      "shelfNumber": "47",
      "image": "/photos/VU-2_47.jpeg"
  }
];
const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(data); // Use local data object directly

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
