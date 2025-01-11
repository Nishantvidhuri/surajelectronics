import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [remoteData, setRemoteData] = useState([]); // State for remote products
  const [allData, setAllData] = useState([]); // State for all products

  useEffect(() => {
    // Simulating fetching remote data
    const fetchedRemoteData = 
    [
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
         "name": "CH 171",
         "shelfNumber": "17",
         "image": "/photos/CH-171_17.jpeg"
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
    
    // Simulating fetching all data (this can be additional or broader data)
    const fetchedAllData = [
        {
            "product name": "resistance 100 e",
            "buying price": 0.08,
            "availability": "No",
            "for mechanic": "",
            "for costumer ": ""
        },
        {
            "product name": 7392,
            "buying price": 35,
            "availability": "Yes",
            "for mechanic": 50,
            "for costumer ": 50
        },
        {
            "product name": "0 12 500 ma",
            "availability": "Yes"
        },
        {
            "product name": "0 9 500 ma",
            "buying price": 50,
            "availability": "Yes"
        },
        {
            "product name": "10/450 v capasitor",
            "buying price": 5,
            "availability": "Yes",
            "for mechanic": 10,
            "for costumer ": 10
        },
        {
            "product name": "100/160 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "100/450 v capasitor",
            "buying price": 18,
            "availability": "Yes"
        },
        {
            "product name": "100/50 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "100/63 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "1000/25 v capasitor",
            "buying price": 3.25,
            "availability": "Yes",
            "for mechanic": 8,
            "for costumer ": 8
        },
        {
            "product name": "1000/35 v capasitor",
            "buying price": 4.5,
            "availability": "Yes",
            "for mechanic": 8,
            "for costumer ": 8
        },
        {
            "product name": "1000/50 v capasitor",
            "availability": "Yes",
            "for mechanic": 15,
            "for costumer ": 15
        },
        {
            "product name": "100k duel",
            "availability": "Yes"
        },
        {
            "product name": "10k on off volume",
            "availability": "Yes"
        },
        {
            "product name": "12 0 12 1 amp",
            "buying price": 110,
            "availability": "Yes"
        },
        {
            "product name": "12 0 12 2 amp",
            "buying price": 280,
            "availability": "Yes"
        },
        {
            "product name": "12 0 12 3 amp",
            "buying price": 380,
            "availability": "Yes"
        },
        {
            "product name": "12 0 12 500 ma",
            "buying price": 50,
            "availability": "Yes"
        },
        {
            "product name": "12 v fan small",
            "buying price": 40,
            "availability": "Yes",
            "for mechanic": 70,
            "for costumer ": 70
        },
        {
            "product name": "12 v relay small",
            "buying price": 7.8,
            "availability": "Yes",
            "for mechanic": 15
        },
        {
            "product name": "12 v relay l",
            "buying price": 33,
            "availability": "Yes",
            "for mechanic": 50
        },
        {
            "product name": "120/450 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "12 v 5 amp + lead ",
            "buying price": 170,
            "availability": "Yes",
            "for mechanic": 270,
            "for costumer ": 270
        },
        {
            "product name": "2 pin rc socket",
            "availability": "Yes"
        },
        {
            "product name": "2 rc connector",
            "availability": "Yes"
        },
        {
            "product name": "2016 cell",
            "availability": "Yes"
        },
        {
            "product name": "2030 cell",
            "buying price": 9.4,
            "availability": "Yes",
            "for mechanic": 20
        },
        {
            "product name": "2032 cell",
            "buying price": 4,
            "availability": "Yes",
            "for mechanic": 15,
            "for costumer ": 20
        },
        {
            "product name": "220/160 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "220/35 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "220/63 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "2200/50 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "2200/63 v capasitor",
            "buying price": 13,
            "availability": "Yes"
        },
        {
            "product name": "2200/65 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "2n2222a",
            "buying price": 1.5,
            "availability": "Yes"
        },
        {
            "product name": "24 v 5 amp adapter",
            "buying price": 220,
            "availability": "Yes",
            "for mechanic": 550,
            "for costumer ": 550,
            "Updated date": 45262,
            "Previous price": 300
        },
        {
            "product name": "24 v fan big",
            "buying price": 80,
            "availability": "Yes",
            "for mechanic": 120,
            "for costumer ": 120
        },
        {
            "product name": "24 v fan small ",
            "buying price": 50,
            "availability": "Yes",
            "for mechanic": 90,
            "for costumer ": 90
        },
        {
            "product name": "24 v relay chokor",
            "buying price": 34,
            "availability": "Yes",
            "for mechanic": 50,
            "for costumer ": 50
        },
        {
            "product name": "24 v relay l",
            "buying price": 38,
            "availability": "Yes"
        },
        {
            "product name": "25 watt bit",
            "availability": "Yes",
            "for mechanic": 35,
            "for costumer ": 35
        },
        {
            "product name": "25 watt bit ",
            "availability": "Yes",
            "for mechanic": 25,
            "for costumer ": 25
        },
        {
            "product name": "25 watt iron",
            "buying price": 48,
            "availability": "Yes",
            "for mechanic": 80,
            "for costumer ": 80
        },
        {
            "product name": "2pin microswitch",
            "buying price": 0.9,
            "availability": "Yes",
            "for mechanic": "3->1",
            "for costumer ": "5->1"
        },
        {
            "product name": "3 pin on/off switch small",
            "availability": "Yes"
        },
        {
            "product name": "3 pin universal socket",
            "availability": "Yes"
        },
        {
            "product name": "3 step on/off switch",
            "availability": "Yes"
        },
        {
            "product name": "33/450 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "3300/50 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "35 watt bit ",
            "availability": "Yes",
            "for mechanic": 25,
            "for costumer ": 25
        },
        {
            "product name": "25 watt element",
            "buying price": 13,
            "availability": "Yes",
            "for costumer ": 15
        },
        {
            "product name": "3pin 100k moti saphet",
            "availability": "Yes"
        },
        {
            "product name": "3rc 10ft",
            "buying price": 85,
            "availability": "Yes",
            "for mechanic": 140,
            "for costumer ": 140
        },
        {
            "product name": "3rc 15ft",
            "availability": "Yes"
        },
        {
            "product name": "3rc 30ft",
            "availability": "Yes"
        },
        {
            "product name": "3rc 45ft",
            "availability": "Yes"
        },
        {
            "product name": "3rc l",
            "availability": "Yes"
        },
        {
            "product name": "3rc local ",
            "buying price": 27,
            "availability": "Yes"
        },
        {
            "product name": "3rc orignal",
            "buying price": 28,
            "availability": "Yes",
            "for mechanic": 70
        },
        {
            "product name": "4 pin microswitch ",
            "buying price": 0.6,
            "availability": "Yes",
            "for mechanic": "3->1",
            "for costumer ": "5->1"
        },
        {
            "product name": "4 pin rc socket",
            "availability": "Yes"
        },
        {
            "product name": "4 pin switch",
            "availability": "Yes"
        },
        {
            "product name": "4.7/450 v capasitor",
            "buying price": 1.6,
            "availability": "Yes",
            "for mechanic": 5
        },
        {
            "product name": "40 amp fuse local",
            "availability": "Yes"
        },
        {
            "product name": "40 amp fuse orignal",
            "availability": "Yes"
        },
        {
            "product name": "47 ohm 1/4 w",
            "buying price": 0.076,
            "availability": "Yes"
        },
        {
            "product name": "470/16 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "470/25 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "470/35 v capasitor ",
            "buying price": 2.8,
            "availability": "Yes",
            "for mechanic": 10,
            "for costumer ": 10
        },
        {
            "product name": "470/63 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "47k moti saphet",
            "buying price": 10,
            "availability": "Yes"
        },
        {
            "product name": "540 mosfet",
            "buying price": 17,
            "availability": "Yes",
            "for mechanic": 22
        },
        {
            "product name": "555 ic",
            "buying price": 4,
            "availability": "Yes",
            "for mechanic": 15
        },
        {
            "product name": "6 pin av socket",
            "availability": "Yes"
        },
        {
            "product name": "6 pin on/off switch",
            "availability": "Yes"
        },
        {
            "product name": "6 pin on/off switch inverter",
            "availability": "Yes"
        },
        {
            "product name": "6 pin rc socket",
            "availability": "Yes"
        },
        {
            "product name": "6 v relay l",
            "buying price": 39,
            "availability": "Yes",
            "for mechanic": 80
        },
        {
            "product name": "60 watt bit",
            "availability": "Yes",
            "for mechanic": 40,
            "for costumer ": 40
        },
        {
            "product name": "60 watt element",
            "buying price": 76,
            "availability": "Yes",
            "for mechanic": 90,
            "for costumer ": 80
        },
        {
            "product name": "60 watt iron record ",
            "availability": "Yes",
            "for mechanic": 130,
            "for costumer ": 130
        },
        {
            "product name": "60 watt iron siron",
            "buying price": 143,
            "availability": "Yes",
            "for mechanic": 170,
            "for costumer ": 160
        },
        {
            "product name": "65mm meter",
            "buying price": 45,
            "availability": "Yes",
            "for mechanic": 60,
            "for costumer ": 70
        },
        {
            "product name": "68/450 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "6800/35 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "6800/50 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": 7805,
            "buying price": 4.6,
            "availability": "Yes"
        },
        {
            "product name": "7n65",
            "buying price": 19,
            "availability": "Yes",
            "for mechanic": 50
        },
        {
            "product name": "82/450 v capasitor",
            "availability": "Yes"
        },
        {
            "product name": "8n60",
            "buying price": 20,
            "availability": "Yes"
        },
        {
            "product name": "9 0 9 500 amp",
            "buying price": 50,
            "availability": "Yes"
        },
        {
            "product name": "9 0 9 750 ma",
            "buying price": 80,
            "availability": "Yes"
        },
        {
            "product name": "9n90",
            "buying price": 28,
            "availability": "Yes",
            "for mechanic": 50,
            "for costumer ": 50
        },
        {
            "product name": "9v battery ",
            "buying price": 10.5,
            "availability": "Yes",
            "for mechanic": 20,
            "for costumer ": 20
        },
        {
            "product name": "airtel",
            "buying price": 37,
            "availability": "Yes",
            "for mechanic": 80,
            "for costumer ": 100
        },
        {
            "product name": "airtel xtream",
            "buying price": 38,
            "availability": "Yes",
            "for costumer ": 120
        },
        {
            "product name": "av connecter",
            "availability": "Yes"
        },
        {
            "product name": "battery cap",
            "availability": "Yes"
        },
        {
            "product name": "battery charger hilex",
            "buying price": 90,
            "availability": "Yes",
            "for mechanic": 140,
            "for costumer ": 140
        },
        {
            "product name": "battery charger jb628",
            "buying price": 160,
            "availability": "Yes",
            "for mechanic": 230,
            "for costumer ": 230
        },
        {
            "product name": "bnc pin",
            "availability": "Yes"
        },
        {
            "product name": "bug converter 2596",
            "buying price": 33,
            "availability": "Yes",
            "for mechanic": 50
        },
        {
            "product name": "bypass switch",
            "availability": "Yes"
        },
        {
            "product name": "cell holder",
            "availability": "Yes"
        },
        {
            "product name": "cisco",
            "availability": "Yes",
            "for costumer ": 80
        },
        {
            "product name": "clamp meter",
            "buying price": 238,
            "availability": "Yes",
            "for mechanic": 280,
            "for costumer ": 280
        },
        {
            "product name": "cut small",
            "availability": "Yes"
        },
        {
            "product name": "cut ulta circuit",
            "availability": "Yes"
        },
        {
            "product name": "d2h",
            "availability": "Yes",
            "for costumer ": 100
        },
        {
            "product name": "dc motor",
            "availability": "Yes"
        },
        {
            "product name": "dc pin small",
            "buying price": 5,
            "availability": "Yes",
            "for mechanic": 10
        },
        {
            "product name": "dc pin socket ",
            "availability": "Yes"
        },
        {
            "product name": "den 52",
            "availability": "Yes",
            "for costumer ": 80
        },
        {
            "product name": "den square ",
            "availability": "Yes",
            "for costumer ": 100
        },
        {
            "product name": "desold wicke",
            "availability": "Yes",
            "for mechanic": 15,
            "for costumer ": 15
        },
        {
            "product name": "desoldering pump",
            "buying price": 50,
            "availability": "Yes",
            "for mechanic": 60,
            "for costumer ": 60
        },
        {
            "product name": "digital multimeter high",
            "buying price": 195,
            "availability": "Yes",
            "for mechanic": 280,
            "for costumer ": 280
        },
        {
            "product name": "digital multimeter low",
            "buying price": 98,
            "availability": "Yes",
            "for mechanic": 150,
            "for costumer ": 150
        },
        {
            "product name": "dish tv av rc",
            "availability": "Yes"
        },
        {
            "product name": "dish tv remote (red)",
            "buying price": 35,
            "availability": "Yes",
            "for mechanic": 80,
            "for costumer ": 100
        },
        {
            "product name": "dp pin small",
            "availability": "Yes"
        },
        {
            "product name": "dpdt switch",
            "buying price": 60,
            "availability": "Yes"
        },
        {
            "product name": "dth supply",
            "availability": "Yes"
        },
        {
            "product name": "dvd 3pin",
            "availability": "Yes"
        },
        {
            "product name": "dvd 6 pin moti",
            "availability": "Yes"
        },
        {
            "product name": "dvd 6pin choti",
            "availability": "Yes"
        },
        {
            "product name": "dvd switch",
            "availability": "Yes"
        },
        {
            "product name": "ethernet 10m",
            "buying price": 110,
            "for mechanic": 200
        },
        {
            "product name": "ethernet 5M",
            "buying price": 70,
            "availability": "Yes",
            "for mechanic": 150
        },
        {
            "product name": "fire tv stick ",
            "buying price": 2350,
            "availability": "Yes",
            "for mechanic": 3000,
            "for costumer ": 3000,
            "Updated date": 45265,
            "Previous price": 2200
        },
        {
            "product name": "fonda microswitch",
            "availability": "Yes"
        },
        {
            "product name": "free dish black ",
            "availability": "Yes",
            "for costumer ": 80
        },
        {
            "product name": "free dish white remote",
            "buying price": 23,
            "availability": "Yes",
            "for costumer ": 50
        },
        {
            "product name": "fuse holder big",
            "buying price": 12,
            "availability": "Yes",
            "for mechanic": 15
        },
        {
            "product name": "fuse holder small",
            "buying price": 7,
            "availability": "Yes",
            "for mechanic": 10
        },
        {
            "product name": "hdmi 1.5m",
            "buying price": 33,
            "availability": "Yes",
            "for mechanic": 100
        },
        {
            "product name": "hdmi 20m",
            "availability": "Yes",
            "for mechanic": 450
        },
        {
            "product name": "hdmi 3m",
            "buying price": 53,
            "availability": "Yes",
            "for mechanic": 150,
            "for costumer ": 120
        },
        {
            "product name": "hdmi 5m",
            "availability": "Yes",
            "for mechanic": 220
        },
        {
            "product name": "hdmi male to female  firetv",
            "buying price": 26,
            "availability": "Yes"
        },
        {
            "product name": "hdmi to av converter",
            "buying price": 130,
            "availability": "Yes",
            "for mechanic": 190,
            "for costumer ": 190
        },
        {
            "product name": "indicator led 220 v",
            "buying price": " ",
            "availability": "Yes"
        },
        {
            "product name": "laptop wire  v-219",
            "buying price": 42,
            "availability": "Yes"
        },
        {
            "product name": "laptop wire orignal",
            "availability": "Yes"
        },
        {
            "product name": "led blue",
            "availability": "Yes"
        },
        {
            "product name": "led green",
            "availability": "Yes"
        },
        {
            "product name": "led multi color",
            "availability": "Yes"
        },
        {
            "product name": "led red",
            "availability": "Yes"
        },
        {
            "product name": "led white 1",
            "availability": "Yes"
        },
        {
            "product name": "led white 2",
            "availability": "Yes"
        },
        {
            "product name": "led white 3",
            "availability": "Yes"
        },
        {
            "product name": "led yellow",
            "availability": "Yes"
        },
        {
            "product name": "lg microswitch",
            "availability": "Yes"
        },
        {
            "product name": "lg remote",
            "buying price": 38,
            "availability": "Yes"
        },
        {
            "product name": "lnb",
            "buying price": 80,
            "availability": "Yes",
            "for mechanic": 120
        },
        {
            "product name": "maxo bond",
            "availability": "Yes"
        },
        {
            "product name": "mi remote",
            "availability": "Yes",
            "for costumer ": 120
        },
        {
            "product name": "mic 10ft",
            "availability": "Yes"
        },
        {
            "product name": "mic 15ft",
            "availability": "Yes"
        },
        {
            "product name": "mic 30ft",
            "availability": "Yes"
        },
        {
            "product name": "mic female socket",
            "availability": "Yes"
        },
        {
            "product name": "mic pin",
            "availability": "Yes"
        },
        {
            "product name": "mic to mic",
            "buying price": 18,
            "availability": "Yes"
        },
        {
            "product name": "mic to st ",
            "buying price": 17,
            "availability": "Yes",
            "for mechanic": 50
        },
        {
            "product name": "moti main wire normal",
            "buying price": 42,
            "availability": "Yes"
        },
        {
            "product name": "moti main wire origmal",
            "buying price": 33,
            "availability": "Yes"
        },
        {
            "product name": "moti saphet 6 pin 50 k",
            "buying price": 12,
            "availability": "Yes"
        },
        {
            "product name": "motor fan",
            "buying price": 0.9,
            "availability": "Yes"
        },
        {
            "product name": "multimeter wire",
            "buying price": 44,
            "availability": "Yes"
        },
        {
            "product name": "onida wire ",
            "buying price": 23,
            "availability": "Yes"
        },
        {
            "product name": "optical 1.5m",
            "buying price": 90,
            "availability": "Yes"
        },
        {
            "product name": "optical 3m",
            "buying price": 140,
            "availability": "Yes"
        },
        {
            "product name": "p30",
            "buying price": 13,
            "availability": "Yes",
            "for mechanic": 22
        },
        {
            "product name": "p55 (o)",
            "buying price": 22
        },
        {
            "product name": "p55",
            "buying price": 11,
            "availability": "Yes",
            "for mechanic": 22,
            "Updated date": 45051
        },
        {
            "product name": "p80",
            "buying price": 13,
            "availability": "Yes",
            "for mechanic": 22
        },
        {
            "product name": "paste big",
            "availability": "Yes",
            "for mechanic": 30,
            "for costumer ": 30
        },
        {
            "product name": "paste small",
            "buying price": 9.8,
            "availability": "Yes",
            "for mechanic": 15,
            "for costumer ": 15
        },
        {
            "product name": "pcb board",
            "availability": "Yes"
        },
        {
            "product name": "philips v 203",
            "buying price": 40,
            "availability": "Yes",
            "for mechanic": 80
        },
        {
            "product name": "preset",
            "buying price": 1.8,
            "availability": "Yes",
            "for mechanic": 2.5
        },
        {
            "product name": "rc jointer",
            "buying price": 3,
            "availability": "Yes",
            "for mechanic": 10
        },
        {
            "product name": "rc pin",
            "buying price": 3.9,
            "availability": "Yes"
        },
        {
            "product name": "relay 24 v 25 amp",
            "buying price": 135,
            "availability": "Yes",
            "for mechanic": 160
        },
        {
            "product name": "relay 24v 25 amp double pole",
            "buying price": 250,
            "availability": "Yes",
            "for mechanic": 290
        },
        {
            "product name": "relay 24v 30 amp",
            "buying price": 165,
            "availability": "Yes",
            "for mechanic": 190
        },
        {
            "product name": "reset switch",
            "availability": "Yes"
        },
        {
            "product name": "rotary",
            "availability": "Yes"
        },
        {
            "product name": " n",
            "buying price": 210,
            "availability": "Yes",
            "for mechanic": 270,
            "for costumer ": 270
        },
        {
            "product name": "samsung remote",
            "buying price": 38,
            "availability": "Yes"
        },
        {
            "product name": "set up box free wire",
            "buying price": 375,
            "availability": "Yes",
            "for mechanic": 550
        },
        {
            "product name": "set up box stand ",
            "buying price": 72,
            "availability": "Yes",
            "for mechanic": 100,
            "for costumer ": 100
        },
        {
            "product name": "sk circuit",
            "availability": "Yes"
        },
        {
            "product name": "soldering wire big",
            "buying price": 82,
            "availability": "Yes",
            "for mechanic": 100,
            "for costumer ": 100,
            "Updated date": "19/5/23"
        },
        {
            "product name": "soldering wire small",
            "buying price": 7.5,
            "availability": "Yes",
            "for mechanic": 15,
            "for costumer ": 15
        },
        {
            "product name": "sony remote",
            "availability": "Yes"
        },
        {
            "product name": "st  male to 2 st female",
            "availability": "Yes"
        },
        {
            "product name": "st 2 rc",
            "availability": "Yes"
        },
        {
            "product name": "st female to 2 rc ",
            "availability": "Yes"
        },
        {
            "product name": "st female to rc",
            "availability": "Yes"
        },
        {
            "product name": "st male to st female",
            "availability": "Yes"
        },
        {
            "product name": "st pin",
            "availability": "Yes"
        },
        {
            "product name": "st to mic",
            "availability": "Yes"
        },
        {
            "product name": "st to rc",
            "buying price": 21,
            "availability": "Yes",
            "for mechanic": 70
        },
        {
            "product name": "st to st",
            "availability": "Yes"
        },
        {
            "product name": "switch 6 pin",
            "availability": "Yes"
        },
        {
            "product name": "switch big 3pin",
            "availability": "Yes"
        },
        {
            "product name": "tata sky both",
            "availability": "Yes",
            "for costumer ": 100
        },
        {
            "product name": "tcnl100",
            "buying price": 2.8,
            "availability": "Yes",
            "for mechanic": 5
        },
        {
            "product name": "thinner",
            "buying price": 60,
            "availability": "Yes",
            "for mechanic": 80
        },
        {
            "product name": "torch bulb",
            "availability": "Yes"
        },
        {
            "product name": "torch holder",
            "availability": "Yes"
        },
        {
            "product name": "touch 6 pin switch",
            "availability": "Yes"
        },
        {
            "product name": "usa to indian convertor",
            "availability": "Yes"
        },
        {
            "product name": "usb hub",
            "availability": "Yes"
        },
        {
            "product name": "usb jointer",
            "availability": "Yes"
        },
        {
            "product name": "usb male to female",
            "buying price": 25,
            "availability": "Yes"
        },
        {
            "product name": "usb socket",
            "availability": "Yes"
        },
        {
            "product name": "vc 6pin volume 50k",
            "buying price": 9
        },
        {
            "product name": "vc 3pin volume 50k",
            "buying price": 9,
            "availability": "Yes"
        },
        {
            "product name": "vcr pin",
            "availability": "Yes"
        },
        {
            "product name": "vga 1.5m",
            "availability": "Yes"
        },
        {
            "product name": "vga 3m",
            "buying price": 85,
            "availability": "Yes"
        },
        {
            "product name": "vga 5m",
            "buying price": 120,
            "availability": "Yes",
            "for mechanic": 200
        },
        {
            "product name": "videocon tv remote VLP",
            "buying price": 65,
            "availability": "Yes"
        },
        {
            "product name": "z44",
            "buying price": 16.5,
            "availability": "Yes"
        },
        {
            "product name": "10 led 40inch 3v",
            "buying price": 68
        },
        {
            "product name": "cello tape",
            "buying price": 18
        },
        {
            "product name": "12 0 12 1.5 amp",
            "buying price": 140
        },
        {
            "product name": "12 0 12 750 ma",
            "buying price": 80
        },
        {
            "product name": "12 v fan big",
            "buying price": 80
        },
        {
            "product name": "12 volt 1 amp",
            "buying price": 55,
            "for mechanic": 120
        },
        {
            "product name": "12 volt 2 amp",
            "buying price": 75,
            "for mechanic": 160
        },
        {
            "product name": "140j",
            "buying price": 45
        },
        {
            "product name": "19.5 3.3 amp hp ",
            "buying price": 280,
            "for mechanic": 500,
            "for costumer ": 500
        },
        {
            "product name": "15 v 2 amp",
            "buying price": 200
        },
        {
            "product name": "19.5 v 1.7 amp",
            "buying price": 180,
            "for mechanic": 350
        },
        {
            "product name": "19.5 v 4.7 amp",
            "buying price": 220,
            "for mechanic": 300
        },
        {
            "product name": "19.5 v 4.7 amp brown",
            "buying price": 300,
            "for mechanic": 450
        },
        {
            "product name": "2 pin microwitch ",
            "buying price": 0.9
        },
        {
            "product name": "20 v 3.25 amp lenovo",
            "buying price": 280,
            "for mechanic": 500,
            "for costumer ": 500
        },
        {
            "product name": "20 v 3.5 amp dell",
            "buying price": 280,
            "for mechanic": 500,
            "for costumer ": 500
        },
        {
            "product name": "2200/25 v capasitor",
            "buying price": 3,
            "for mechanic": 8
        },
        {
            "product name": "2200/35 v capasitor",
            "buying price": 7,
            "for mechanic": 15
        },
        {
            "product name": "24 volt 25 amp 2 pole",
            "buying price": 250,
            "for mechanic": 290
        },
        {
            "product name": "25 watt z series",
            "buying price": 53,
            "for mechanic": 100
        },
        {
            "product name": "10 watt iron",
            "buying price": 44
        },
        {
            "product name": "25n120 ",
            "buying price": 46,
            "for mechanic": 60,
            "for costumer ": 60
        },
        {
            "product name": "28-h",
            "buying price": 420,
            "for mechanic": 600,
            "for costumer ": 900
        },
        {
            "product name": "3 HDMI INPUT TO 1 OUTPUT BUTTON",
            "buying price": 180
        },
        {
            "product name": "3 HDMI INPUT TO 1 OUTPUT REMOTE",
            "buying price": 200
        },
        {
            "product name": "3 pin vc1",
            "buying price": 15
        },
        {
            "product name": "32 inch movable bm-222",
            "buying price": 270,
            "for mechanic": 400,
            "for costumer ": 500
        },
        {
            "product name": "33/500 v capacitor ",
            "buying price": 7,
            "for mechanic": 15
        },
        {
            "product name": 2050,
            "buying price": 9
        },
        {
            "product name": "4 inch woofer",
            "buying price": 98
        },
        {
            "product name": "4 inch movable ",
            "buying price": 140,
            "for mechanic": 210,
            "for costumer ": 270
        },
        {
            "product name": "4k 4 inch stand",
            "buying price": 35,
            "for mechanic": "s",
            "for costumer ": 100
        },
        {
            "product name": "5 volt 2 amp ",
            "buying price": 67,
            "for mechanic": 160
        },
        {
            "product name": "5 volt 1 amp ",
            "buying price": 55,
            "for mechanic": 120
        },
        {
            "product name": "547 transistor",
            "for mechanic": 2
        },
        {
            "product name": "55 inch x1455",
            "buying price": 650,
            "for mechanic": 850,
            "for costumer ": 1000
        },
        {
            "product name": "557 transistor",
            "for mechanic": 2
        },
        {
            "product name": "6 INCH SCREWDRIVER",
            "buying price": 50,
            "for mechanic": 70
        },
        {
            "product name": "6 v 1 amp adapter",
            "buying price": 55,
            "for mechanic": 120
        },
        {
            "product name": "60 W GLUE GUN",
            "buying price": 130,
            "for mechanic": 180
        },
        {
            "product name": "65mm 50 amp meter",
            "buying price": 50,
            "for mechanic": 70
        },
        {
            "product name": "72mm 300v",
            "buying price": 65,
            "for mechanic": 70
        },
        {
            "product name": "72mm 60 amp ",
            "buying price": 65,
            "for mechanic": 80
        },
        {
            "product name": "8n60"
        },
        {
            "product name": "6a65"
        },
        {
            "product name": 7812
        },
        {
            "product name": "8 INCH SCREWDRIVER",
            "buying price": 60,
            "for mechanic": 90
        },
        {
            "product name": "9 0 9 1 amp",
            "buying price": 110
        },
        {
            "product name": "9 0 9 1.5 amp",
            "buying price": 130
        },
        {
            "product name": "aa battery",
            "buying price": 6.5,
            "for mechanic": 10
        },
        {
            "product name": "aaa battery",
            "buying price": 5.5,
            "for mechanic": 10,
            "for costumer ": 10
        },
        {
            "product name": "ac remote 1 hitachi",
            "buying price": 110,
            "for mechanic": 220
        },
        {
            "product name": "ac remote 10 samsung",
            "buying price": 120
        },
        {
            "product name": "ac remote 100",
            "buying price": 320
        },
        {
            "product name": "ac remote 101"
        },
        {
            "product name": "ac remote 109",
            "buying price": 110
        },
        {
            "product name": "ac remote 11"
        },
        {
            "product name": "ac remote 12",
            "buying price": 120
        },
        {
            "product name": "ac remote 13"
        },
        {
            "product name": "ac remote 131",
            "buying price": 130
        },
        {
            "product name": "ac remote 14"
        },
        {
            "product name": "ac remote 15"
        },
        {
            "product name": "ac remote 16 hitachi",
            "buying price": 120
        },
        {
            "product name": "ac remote 16 ogeneral",
            "buying price": 95
        },
        {
            "product name": "ac remote 18"
        },
        {
            "product name": "ac remote 19"
        },
        {
            "product name": "ac remote 20 panasonic",
            "buying price": 100
        },
        {
            "product name": "ac remote 2 voltas",
            "buying price": 105
        },
        {
            "product name": "ac remote 22"
        },
        {
            "product name": "ac remote 23"
        },
        {
            "product name": "ac remote 24 lg",
            "buying price": 60
        },
        {
            "product name": "ac remote 25"
        },
        {
            "product name": "ac remote 26",
            "buying price": 100
        },
        {
            "product name": "ac remote 27",
            "buying price": 160
        },
        {
            "product name": "ac remote 28 voltas",
            "buying price": 120
        },
        {
            "product name": "ac remote 28 bluestar",
            "buying price": 120
        },
        {
            "product name": "ac remote 29"
        },
        {
            "product name": "ac remote 30 bluestar",
            "buying price": 95
        },
        {
            "product name": "ac remote 30",
            "buying price": 75
        },
        {
            "product name": "ac remote 31"
        },
        {
            "product name": "ac remote 32"
        },
        {
            "product name": "ac remote 33"
        },
        {
            "product name": "ac remote 34 hitachi",
            "buying price": 110
        },
        {
            "product name": "ac remote 34 panasonic",
            "buying price": 85
        },
        {
            "product name": "ac remote 35 blue star",
            "buying price": 150
        },
        {
            "product name": "ac remote 36 voltas",
            "buying price": 62
        },
        {
            "product name": "ac remote 38 videocon",
            "buying price": 105
        },
        {
            "product name": "ac remote 37 o general",
            "buying price": 115
        },
        {
            "product name": "ac remote 38 samsung",
            "buying price": 100
        },
        {
            "product name": "ac remote 39 godrej",
            "buying price": 110
        },
        {
            "product name": "ac remote 39 gol",
            "buying price": 105
        },
        {
            "product name": "ac remote 4"
        },
        {
            "product name": "ac remote 4 lloyd",
            "buying price": 95
        },
        {
            "product name": "ac remote 41 dieken",
            "buying price": 180
        },
        {
            "product name": "ac remote 41 voltas",
            "buying price": 160
        },
        {
            "product name": "ac remote 41 whirpool",
            "buying price": 110
        },
        {
            "product name": "ac remote 43 voltas ",
            "buying price": 100
        },
        {
            "product name": "ac remote 44",
            "buying price": 130
        },
        {
            "product name": "ac remote 44 voltas",
            "buying price": 110
        },
        {
            "product name": "ac remote 48"
        },
        {
            "product name": "ac remote 49"
        },
        {
            "product name": "ac remote 5 LG BIG",
            "buying price": 100
        },
        {
            "product name": "ac remote 5 lg",
            "buying price": 115
        },
        {
            "product name": "ac remote 50"
        },
        {
            "product name": "ac remote 51"
        },
        {
            "product name": "ac remote 52"
        },
        {
            "product name": "ac remote 53"
        },
        {
            "product name": "ac remote 54"
        },
        {
            "product name": "ac remote 55"
        },
        {
            "product name": "ac remote 56"
        },
        {
            "product name": "ac remote 57"
        },
        {
            "product name": "ac remote 58"
        },
        {
            "product name": "ac remote 59"
        },
        {
            "product name": "ac remote 6"
        },
        {
            "product name": "ac remote 60"
        },
        {
            "product name": "ac remote 61"
        },
        {
            "product name": "ac remote 62"
        },
        {
            "product name": "ac remote 63"
        },
        {
            "product name": "ac remote 64"
        },
        {
            "product name": "ac remote 65"
        },
        {
            "product name": "ac remote 66"
        },
        {
            "product name": "ac remote 67"
        },
        {
            "product name": "ac remote 68"
        },
        {
            "product name": "ac remote 69"
        },
        {
            "product name": "ac remote 7 carrier",
            "buying price": 120
        },
        {
            "product name": "ac remote 70"
        },
        {
            "product name": "ac remote 71"
        },
        {
            "product name": "ac remote 72"
        },
        {
            "product name": "ac remote 73"
        },
        {
            "product name": "ac remote 74"
        },
        {
            "product name": "ac remote 75"
        },
        {
            "product name": "ac remote 76"
        },
        {
            "product name": "ac remote 77"
        },
        {
            "product name": "ac remote 78"
        },
        {
            "product name": "ac remote 79"
        },
        {
            "product name": "ac remote 8"
        },
        {
            "product name": "ac remote 80"
        },
        {
            "product name": "ac remote 81"
        },
        {
            "product name": "ac remote 82"
        },
        {
            "product name": "ac remote 83"
        },
        {
            "product name": "ac remote 84"
        },
        {
            "product name": "ac remote 85"
        },
        {
            "product name": "ac remote 86"
        },
        {
            "product name": "ac remote 87"
        },
        {
            "product name": "ac remote 88"
        },
        {
            "product name": "ac remote 89"
        },
        {
            "product name": "ac remote 9",
            "buying price": 90
        },
        {
            "product name": "ac remote 90"
        },
        {
            "product name": "ac remote 91"
        },
        {
            "product name": "ac remote 92"
        },
        {
            "product name": "ac remote 93"
        },
        {
            "product name": "ac remote 94"
        },
        {
            "product name": "ac remote 95"
        },
        {
            "product name": "ac remote 96"
        },
        {
            "product name": "ac remote 97"
        },
        {
            "product name": "ac remote 98"
        },
        {
            "product name": "ac remote 99"
        },
        {
            "product name": "ac socket",
            "buying price": 15
        },
        {
            "product name": "air mouse ",
            "buying price": 165
        },
        {
            "product name": "bt remote",
            "buying price": 11
        },
        {
            "product name": "bug converter 1235",
            "buying price": 25
        },
        {
            "product name": "bug converter 1239",
            "buying price": 40
        },
        {
            "product name": "c - type ",
            "buying price": 65,
            "for mechanic": 90
        },
        {
            "product name": "CHIMTI MODEL ON 9 ",
            "buying price": 20,
            "for mechanic": 30
        },
        {
            "product name": "china card mepl",
            "buying price": 590
        },
        {
            "product name": "cisco",
            "buying price": 40
        },
        {
            "product name": "CUTTER EGO 07",
            "buying price": 30,
            "for mechanic": 50
        },
        {
            "product name": "CUTTER MULTITEC 07",
            "buying price": 50,
            "for mechanic": 70
        },
        {
            "product name": "den 52",
            "buying price": 33
        },
        {
            "product name": "den chokor",
            "buying price": 40
        },
        {
            "product name": "6 mm clip",
            "buying price": 15
        },
        {
            "product name": "5 mm clip",
            "buying price": 13
        },
        {
            "product name": "7 mm clip",
            "buying price": 17
        },
        {
            "product name": "8 mm clip",
            "buying price": 21
        },
        {
            "product name": "10 mm clip",
            "buying price": 30
        },
        {
            "product name": "3 mm clip",
            "buying price": 11.5
        },
        {
            "product name": "gitti blue",
            "buying price": 10
        },
        {
            "product name": "gitti white",
            "buying price": 20
        },
        {
            "product name": "tie 6 inch",
            "buying price": 30
        },
        {
            "product name": "tie 8 inch",
            "buying price": 35
        },
        {
            "product name": "tie 12 inch",
            "buying price": 45
        },
        {
            "product name": "tie 10 inch",
            "buying price": 40
        },
        {
            "buying price": 21
        },
        {
            "product name": "den stb 29",
            "buying price": 36
        },
        {
            "product name": "dish tv long",
            "buying price": 42
        },
        {
            "product name": "DISH TV PATLA",
            "buying price": 40
        },
        {
            "product name": "dishtv red",
            "buying price": 37
        },
        {
            "product name": "ethernet 3M",
            "buying price": 55,
            "for mechanic": 100
        },
        {
            "product name": "fireflix",
            "buying price": 2.5,
            "for mechanic": 5,
            "for costumer ": 5
        },
        {
            "product name": "firestick remote",
            "buying price": 300
        },
        {
            "product name": "fonda",
            "buying price": 0.3
        },
        {
            "product name": "free dish white",
            "buying price": 23
        },
        {
            "product name": "fuse holder medium",
            "buying price": 8.5
        },
        {
            "product name": "fuse holder small",
            "buying price": 7,
            "for mechanic": 10,
            "for costumer ": 10
        },
        {
            "product name": "glass fuse big",
            "buying price": 0.6
        },
        {
            "product name": "glass fuse small 10 amp",
            "buying price": 0.5
        },
        {
            "product name": "glass fuse small 5 amp",
            "buying price": 0.5
        },
        {
            "product name": "gol window meter"
        },
        {
            "product name": "hathway",
            "buying price": 33
        },
        {
            "product name": "hathway chota",
            "buying price": 38
        },
        {
            "product name": "hdmi 10 m",
            "buying price": 175,
            "for mechanic": 290
        },
        {
            "product name": "hdmi 15 m",
            "buying price": 350
        },
        {
            "product name": "kanashi 32 inch ",
            "buying price": 340,
            "for mechanic": 450,
            "for costumer ": 600
        },
        {
            "product name": "lg long remote",
            "buying price": 65
        },
        {
            "product name": "lg magic remote",
            "buying price": 580
        },
        {
            "product name": "lg smart remote",
            "buying price": 38
        },
        {
            "product name": "m-10",
            "buying price": 80,
            "for mechanic": 120,
            "for costumer ": 150
        },
        {
            "product name": "m-12",
            "buying price": 95,
            "for mechanic": 130,
            "for costumer ": 160
        },
        {
            "product name": "m-15",
            "buying price": 120,
            "for mechanic": 180,
            "for costumer ": 220
        },
        {
            "product name": "m-21",
            "buying price": 150,
            "for mechanic": 240,
            "for costumer ": 320
        },
        {
            "product name": "microusb cable ",
            "buying price": 36,
            "for mechanic": 50
        },
        {
            "product name": "multi inverter blue",
            "buying price": 73
        },
        {
            "product name": "n81 logic",
            "buying price": 330
        },
        {
            "product name": "n86 logic",
            "buying price": 330
        },
        {
            "product name": "p30 orignal",
            "buying price": 23
        },
        {
            "product name": "philips v 198",
            "buying price": 30,
            "for mechanic": 60,
            "for costumer ": 60
        },
        {
            "product name": "PLAS 908 ",
            "buying price": 130,
            "for mechanic": 180
        },
        {
            "product name": "remote 1",
            "buying price": 52
        },
        {
            "product name": "remote 10"
        },
        {
            "product name": "remote 11",
            "buying price": 65
        },
        {
            "product name": "remote 12"
        },
        {
            "product name": "remote 13"
        },
        {
            "product name": "remote 14",
            "buying price": 40
        },
        {
            "product name": "remote 15",
            "buying price": 37
        },
        {
            "product name": "remote 16"
        },
        {
            "product name": "remote 17",
            "buying price": 45
        },
        {
            "product name": "remote 18",
            "buying price": 60
        },
        {
            "product name": "remote 19",
            "buying price": 46
        },
        {
            "product name": "remote 2",
            "buying price": 53
        },
        {
            "product name": "remote 20"
        },
        {
            "product name": "remote 21"
        },
        {
            "product name": "remote 22"
        },
        {
            "product name": "remote 23",
            "buying price": 62
        },
        {
            "product name": "remote 24",
            "buying price": 65
        },
        {
            "product name": "remote 25"
        },
        {
            "product name": "remote 26",
            "buying price": 65
        },
        {
            "product name": "remote 27",
            "buying price": 55
        },
        {
            "product name": "remote 28",
            "buying price": 55
        },
        {
            "product name": "remote 29",
            "buying price": 55
        },
        {
            "product name": "remote 3"
        },
        {
            "product name": "remote 30",
            "buying price": 55
        },
        {
            "product name": "remote 31"
        },
        {
            "product name": "remote 32",
            "buying price": 50
        },
        {
            "product name": "remote 33"
        },
        {
            "product name": "remote 34",
            "buying price": 55
        },
        {
            "product name": "remote 35",
            "buying price": 55
        },
        {
            "product name": "remote 36"
        },
        {
            "product name": "remote 37",
            "buying price": 90
        },
        {
            "product name": "remote 38"
        },
        {
            "product name": "remote 39",
            "buying price": 42
        },
        {
            "product name": "remote 4"
        },
        {
            "product name": "remote 40",
            "buying price": 110
        },
        {
            "product name": "remote 41",
            "buying price": 42
        },
        {
            "product name": "remote 41 long",
            "buying price": 57
        },
        {
            "product name": "remote 42",
            "buying price": 65
        },
        {
            "product name": "remote 43 whirlpool",
            "buying price": 120
        },
        {
            "product name": "remote 44",
            "buying price": 50
        },
        {
            "product name": "remote 45",
            "buying price": 58
        },
        {
            "product name": "remote 46",
            "buying price": 60
        },
        {
            "product name": "remote 47",
            "buying price": 53
        },
        {
            "product name": "remote 48 small",
            "buying price": 41
        },
        {
            "product name": "remote 48.2 big",
            "buying price": 65
        },
        {
            "product name": "remote 49",
            "buying price": 49
        },
        {
            "product name": "remote 5",
            "buying price": 50
        },
        {
            "product name": "remote 50"
        },
        {
            "product name": "remote 51",
            "buying price": 60
        },
        {
            "product name": "remote 52",
            "buying price": 60
        },
        {
            "product name": "remote 53",
            "buying price": 60
        },
        {
            "product name": "remote 54"
        },
        {
            "product name": "remote 55",
            "buying price": 45
        },
        {
            "product name": "remote 56"
        },
        {
            "product name": "remote 57 "
        },
        {
            "product name": "remote 58",
            "buying price": 68
        },
        {
            "product name": "remote 59",
            "buying price": 55
        },
        {
            "product name": "remote 6"
        },
        {
            "product name": "remote 60 bluetooth",
            "buying price": 370,
            "for mechanic": 500
        },
        {
            "product name": "remote 61"
        },
        {
            "product name": "remote 62",
            "buying price": 65
        },
        {
            "product name": "remote 63",
            "buying price": 38
        },
        {
            "product name": "remote 64",
            "buying price": 85
        },
        {
            "product name": "remote 65",
            "buying price": 65
        },
        {
            "product name": "remote 66",
            "buying price": 38
        },
        {
            "product name": "remote 67",
            "buying price": 40
        },
        {
            "product name": "remote 68",
            "buying price": 40
        },
        {
            "product name": "remote 69"
        },
        {
            "product name": "remote 7",
            "buying price": 38
        },
        {
            "product name": "remote 70"
        },
        {
            "product name": "remote 71"
        },
        {
            "product name": "remote 72"
        },
        {
            "product name": "remote 73 aiwa",
            "buying price": 60
        },
        {
            "product name": "remote 73 led 100",
            "buying price": 46
        },
        {
            "product name": "remote 74",
            "buying price": 85
        },
        {
            "product name": "remote 75 micromax",
            "buying price": 70
        },
        {
            "product name": "remote 76.1 sansui",
            "buying price": 45
        },
        {
            "product name": "remote 76 bp",
            "buying price": 45
        },
        {
            "product name": "remote 77",
            "buying price": 60
        },
        {
            "product name": "remote 78 fire tv",
            "buying price": 255
        },
        {
            "product name": "remote 78 mi voice",
            "buying price": 155
        },
        {
            "product name": "remote 79",
            "buying price": 76
        },
        {
            "product name": "remote 8",
            "buying price": 37
        },
        {
            "product name": "remote 80",
            "buying price": 175
        },
        {
            "product name": "remote 81",
            "buying price": 45
        },
        {
            "product name": "remote 82",
            "buying price": 60
        },
        {
            "product name": "remote 83",
            "buying price": 50
        },
        {
            "product name": "remote 84",
            "buying price": 50
        },
        {
            "product name": "remote 85",
            "buying price": 95,
            "for costumer ": " "
        },
        {
            "product name": "remote 86",
            "buying price": 75
        },
        {
            "product name": "remote 87 jio ",
            "buying price": 360
        },
        {
            "product name": "remote 88",
            "buying price": 100
        },
        {
            "product name": "remote 89",
            "buying price": 60
        },
        {
            "product name": "remote 9",
            "buying price": 70
        },
        {
            "product name": "remote 90",
            "buying price": 52
        },
        {
            "product name": "remote 91",
            "buying price": 52
        },
        {
            "product name": "remote 92",
            "buying price": 280
        },
        {
            "product name": "remote 93",
            "buying price": 120
        },
        {
            "product name": "remote 94 motrola",
            "buying price": 100
        },
        {
            "product name": "remote 94 AOC",
            "buying price": 90
        },
        {
            "product name": "remote 95"
        },
        {
            "product name": "remote 96",
            "buying price": 325
        },
        {
            "product name": "remote 97",
            "buying price": 50
        },
        {
            "product name": "remote 98",
            "buying price": 40
        },
        {
            "product name": "remote 99 small"
        },
        {
            "product name": "rg6",
            "buying price": 4.8,
            "for mechanic": 10
        },
        {
            "product name": "samsung small",
            "buying price": 42
        },
        {
            "product name": "SCREWDRIVER KIT belto K-585",
            "buying price": 130,
            "for mechanic": 180
        },
        {
            "product name": "SCREWDRIVER KIT peng fa 7339 A",
            "buying price": 140,
            "for mechanic": 180
        },
        {
            "product name": "SCREWDRIVER T504",
            "buying price": 24,
            "for mechanic": 40
        },
        {
            "product name": "set up box free adapter",
            "buying price": 405
        },
        {
            "product name": "sony remote",
            "buying price": 38
        },
        {
            "product name": "sony smart long",
            "buying price": 60
        },
        {
            "product name": "speaker wire",
            "buying price": "4 roll of wire 1330"
        },
        {
            "product name": "st 2 rc 3 meter surana",
            "buying price": 32,
            "for mechanic": 100
        },
        {
            "product name": "st 2 rc 3 meter vardamaan",
            "buying price": 70,
            "for mechanic": 120,
            "for costumer ": 120
        },
        {
            "product name": "ta 2003",
            "buying price": 20,
            "for mechanic": 30,
            "for costumer ": 30
        },
        {
            "product name": "TAPARIA 810 CHOTA SCREWDRIVER",
            "buying price": 41,
            "for mechanic": 50
        },
        {
            "product name": "tata sky",
            "buying price": 39
        },
        {
            "product name": "tata sky binge",
            "buying price": 75
        },
        {
            "product name": "tata sky patla",
            "buying price": 38
        },
        {
            "product name": "telephone wire 1.5m",
            "buying price": 7,
            "for mechanic": 30
        },
        {
            "product name": "telephone wire 3m",
            "buying price": 12,
            "for mechanic": 50
        },
        {
            "product name": "TESTER ",
            "buying price": 20,
            "for mechanic": 30
        },
        {
            "product name": "thinner ",
            "buying price": 60,
            "for mechanic": 80
        },
        {
            "product name": "tyn612n",
            "buying price": 12
        },
        {
            "product name": "vcon new ",
            "buying price": 40
        },
        {
            "product name": "vcon normal",
            "buying price": 44
        },
        {
            "product name": "remote 103",
            "buying price": 65
        },
        {
            "product name": "remote 101 multi",
            "buying price": 65
        },
        {
            "product name": "remote 101",
            "buying price": 60
        },
        {
            "product name": "remote 102",
            "buying price": 50
        },
        {
            "product name": "videocon",
            "buying price": 48
        },
        {
            "product name": "dc socket nut type ",
            "buying price": 1
        },
        {
            "product name": "dc socket pcb",
            "buying price": 3
        },
        {
            "product name": "bt 139",
            "buying price": 15
        },
        {
            "product name": "motherboard t.r67.07",
            "buying price": 570
        },
        {
            "product name": "motherboard t.r67.03h",
            "buying price": 520
        },
        {
            "product name": "bd 139",
            "buying price": 3
        },
        {
            "product name": "nsi autocut"
        },
        {
            "product name": "buzzer"
        },
        {
            "product name": "24 v battery"
        },
        {
            "product name": "12 v relay chokor",
            "buying price": 38
        },
        {
            "product name": 4148
        },
        {
            "product name": "4n35"
        },
        {
            "product name": "dc fuse"
        },
        {
            "product name": "bt circuit"
        },
        {
            "product name": "9 W BULB PHILIPS",
            "buying price": 83
        },
        {
            "product name": "9 W BULB CROMPTON",
            "buying price": 65
        },
        {
            "product name": "BLACK TAPE"
        },
        {
            "product name": "2030 IC",
            "buying price": 9
        },
        {
            "product name": "12 V CELL",
            "buying price": 18
        },
        {
            "product name": "ST 3 30 AMP"
        },
        {
            "product name": "3RC JOINTER"
        },
        {
            "product name": "sound board circuit ca 3110",
            "buying price": 44
        },
        {
            "product name": "connaction wire"
        },
        {
            "product name": "2 pol 4 way "
        },
        {
            "product name": "ac remote 2"
        },
        {
            "product name": "ac remote 3"
        },
        {
            "product name": "dish tv wire"
        },
        {
            "product name": "24 v 30 amp double pol"
        },
        {
            "product name": "sony pin jointer"
        },
        {
            "product name": "9 volt 1 amp",
            "buying price": 55
        },
        {
            "product name": "ck 100"
        },
        {
            "product name": "lcd wire low quality",
            "buying price": 33
        },
        {
            "product name": "lcd wire v-217",
            "buying price": 42
        },
        {
            "product name": "lcd wire good quality v-217a",
            "buying price": 70
        },
        {
            "product name": "4007 diode"
        },
        {
            "product name": "5408 diode"
        },
        {
            "product name": 3205
        },
        {
            "product name": 324,
            "buying price": 5.5
        },
        {
            "product name": "ptc"
        },
        {
            "product name": "remote 100 bpl",
            "buying price": 70
        },
        {
            "product name": 3021
        },
        {
            "product name": "bt 140 original",
            "buying price": 30
        },
        {
            "product name": "bt 140",
            "buying price": 19
        },
        {
            "product name": "2 pol 4 way 30amp rotary",
            "buying price": 210
        },
        {
            "product name": "khidki meter",
            "buying price": 35
        },
        {
            "product name": "2 pol 4 way 15 amp rotary",
            "buying price": 140,
            "for mechanic": 190
        },
        {
            "product name": "mic wired (e-222)",
            "buying price": 140
        },
        {
            "product name": "6A4"
        },
        {
            "product name": "dpdt switch",
            "buying price": 60
        },
        {
            "product name": "battery connecter",
            "buying price": 1.9
        },
        {
            "product name": "mic wired beta 68a",
            "buying price": 200
        },
        {
            "product name": "mic beta 77a",
            "buying price": 200
        },
        {
            "product name": "mic wireless wm-308c",
            "buying price": 340
        },
        {
            "product name": "mic wired Beta 58A",
            "buying price": 240
        },
        {
            "product name": "30 inch 8 led",
            "buying price": 68
        },
        {
            "product name": "inverter card yellow",
            "buying price": 155
        },
        {
            "product name": "STR Board 30 amp",
            "buying price": 36
        },
        {
            "product name": "STR Board 90 amp"
        },
        {
            "product name": "toggle switch"
        },
        {
            "product name": "LM317"
        },
        {
            "product name": "BTA12"
        },
        {
            "product name": "LM358"
        },
        {
            "product name": "dc connector"
        },
        {
            "product name": 1547
        },
        {
            "product name": "Ht 2 30 amp",
            "buying price": 9
        },
        {
            "product name": "Ht 3 30 amp",
            "buying price": 12
        },
        {
            "product name": "Ht 4 30 amp",
            "buying price": 15
        },
        {
            "product name": "Ht 5 30 amp",
            "buying price": 20
        },
        {
            "product name": "Ht 6 30 amp",
            "buying price": 25
        },
        {
            "product name": "Ht 2 60 amp",
            "buying price": 25
        },
        {
            "product name": "Ht 3 60 amp",
            "buying price": 33
        },
        {
            "product name": "Ht 4 60 amp",
            "buying price": 40
        },
        {
            "product name": "Ht 5 60 amp",
            "buying price": 65
        },
        {
            "product name": "Ht 6 60 amp",
            "buying price": 75
        },
        {
            "product name": "Ht 2 100 amp",
            "buying price": 90
        },
        {
            "product name": "Ht 3 100 amp",
            "buying price": 120
        },
        {
            "product name": "Ht 4 100 amp",
            "buying price": 150
        },
        {
            "product name": "30 amp rotary 1-8",
            "buying price": 140
        },
        {
            "product name": "panasonic 60 pin logic",
            "buying price": 700
        },
        {
            "product name": "mirco circuit 4 trasistor",
            "buying price": 130
        },
        {
            "product name": "68 pin ffc",
            "buying price": 15
        },
        {
            "product name": "non lbds sida sida ",
            "buying price": 45
        },
        {
            "product name": "AV TO HDMI",
            "buying price": 200
        },
        {
            "product name": "airtel xtream voice",
            "buying price": 330
        },
        {
            "product name": "AC FAN 4 INCH 220V",
            "buying price": 150
        },
        {
            "product name": "remote 100 realme voice",
            "buying price": 170
        },
        {
            "product name": "remote 100 tcl voice long",
            "buying price": 340
        },
        {
            "product name": "remote 100 tcl voice small",
            "buying price": 260
        },
        {
            "product name": "9 volt 2 amp"
        },
        {
            "product name": "LG LBDS ulta sida ",
            "buying price": 50
        },
        {
            "product name": "4 +4 lg led pr set",
            "buying price": 560
        },
        {
            "product name": "rg59",
            "buying price": 2.9
        },
        {
            "product name": "speaker 8ohm 13",
            "buying price": 65
        },
        {
            "product name": "bacha mother board card",
            "buying price": 570
        },
        {
            "product name": "free dish remote black",
            "buying price": 38,
            "for mechanic": 80
        },
        {
            "product name": 8050
        },
        {
            "product name": "BTA16"
        },
        {
            "product name": "50k dule"
        },
        {
            "product name": "music remote "
        },
        {
            "product name": "6 pin push"
        },
        {
            "product name": "hotgun element",
            "buying price": 35
        },
        {
            "product name": "8 inch woofer"
        },
        {
            "product name": "6 inchwoofer"
        },
        {
            "product name": "5 inch woofer"
        },
        {
            "product name": "12 v supply with inverter"
        },
        {
            "product name": "12 v cell",
            "buying price": 18
        },
        {
            "product name": 2025,
            "buying price": 6
        },
        {
            "product name": "lg bacha",
            "buying price": 40
        },
        {
            "product name": "2x3",
            "buying price": 40
        },
        {
            "product name": "2x4",
            "buying price": 48
        },
        {
            "product name": "2x5",
            "buying price": 48
        },
        {
            "product name": "mic to mic 1.5m",
            "buying price": 18
        },
        {
            "product name": "mic to mic 3m",
            "buying price": 50
        },
        {
            "product name": " tcl bl 11 led 4k 31.5",
            "buying price": 95
        },
        {
            "product name": "mi lvds",
            "buying price": 40
        },
        {
            "product name": "bluetooth remote small",
            "buying price": 8
        },
        {
            "product name": "vcon black 3d",
            "buying price": 65
        },
        {
            "product name": "air keyboard voice",
            "buying price": 325
        },
        {
            "product name": "12 0 12 2 amp aluminium",
            "buying price": 120
        },
        {
            "product name": "hdmi "
        },
        {
            "product name": "philips small t-5",
            "buying price": 25
        },
        {
            "product name": "notch pilas",
            "buying price": 45,
            "for mechanic": 70
        },
        {
            "product name": "30 w bit",
            "buying price": 30
        },
        {
            "product name": "47/160 v",
            "buying price": 3.8
        },
        {
            "product name": "set up box stand small",
            "buying price": 50,
            "for mechanic": 90
        },
        {
            "product name": "t-430 logic samsung sony",
            "buying price": 600
        },
        {
            "product name": "3 v 6 led",
            "buying price": 38
        },
        {
            "product name": "12 v 3 amp",
            "buying price": 140,
            "for mechanic": 250
        },
        {
            "product name": "2 + 2 inverter ",
            "buying price": 120
        },
        {
            "product name": "audio board 6283 eco",
            "buying price": 40
        },
        {
            "product name": "audio board 6283 delux",
            "buying price": 52
        },
        {
            "product name": "12 v iron",
            "buying price": 43
        },
        {
            "product name": "4 inch speaker",
            "buying price": 41
        },
        {
            "product name": "24c16",
            "buying price": 10
        },
        {
            "product name": "24c32",
            "buying price": 10
        },
        {
            "product name": "24c64",
            "buying price": 10
        },
        {
            "product name": "ac stand",
            "buying price": 225
        }
    ];

    // Set both data arrays
    setRemoteData(fetchedRemoteData);
    setAllData(fetchedAllData);
  }, []);

  return (
    <ProductContext.Provider value={{ remoteData, allData, setAllData, setRemoteData }}>
      {children}
    </ProductContext.Provider>
  );
};
