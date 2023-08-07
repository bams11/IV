const countryToContinent = {
  AFG: "AS", // Afghanistan, Islamic Republic of
  AFE: "AF",
  AFW: "AF",
  ALB: "EU", // Albania, Republic of
  ATA: "AN", // Antarctica, the territory South of 60 deg S
  DZA: "AF", // Algeria, People's Democratic Republic of
  ASM: "OC", // American Samoa
  AND: "EU", // Andorra, Principality of
  AGO: "AF", // Angola, Republic of
  ATG: "NA", // Antigua and Barbuda
  AZE: "EU", // Azerbaijan, Republic of
  ARG: "SA", // Argentina, Argentine Republic
  AUS: "OC", // Australia, Commonwealth of
  AUT: "EU", // Austria, Republic of
  BHS: "NA", // Bahamas, Commonwealth of the
  BHR: "AS", // Bahrain, Kingdom of
  BGD: "AS", // Bangladesh, People's Republic of
  ARM: "EU", // Armenia, Republic of
  BRB: "NA", // Barbados
  BEL: "EU", // Belgium, Kingdom of
  BMU: "NA", // Bermuda
  BTN: "AS", // Bhutan, Kingdom of
  BOL: "SA", // Bolivia, Republic of
  BIH: "EU", // Bosnia and Herzegovina
  BWA: "AF", // Botswana, Republic of
  BVT: "AN", // Bouvet Island (Bouvetoya)
  BRA: "SA", // Brazil, Federative Republic of
  BLZ: "NA", // Belize
  IOT: "AS", // British Indian Ocean Territory (Chagos Archipelago)
  SLB: "OC", // Solomon Islands
  VGB: "NA", // British Virgin Islands
  BRN: "AS", // Brunei Darussalam
  BGR: "EU", // Bulgaria, Republic of
  MMR: "AS", // Myanmar, Union of
  BDI: "AF", // Burundi, Republic of
  BLR: "EU", // Belarus, Republic of
  KHM: "AS", // Cambodia, Kingdom of
  CMR: "AF", // Cameroon, Republic of
  CAN: "NA", // Canada
  CPV: "AF", // Cape Verde, Republic of
  CYM: "NA", // Cayman Islands
  CAF: "AF", // Central African Republic
  LKA: "AS", // Sri Lanka, Democratic Socialist Republic of
  TCD: "AF", // Chad, Republic of
  CHL: "SA", // Chile, Republic of
  CHN: "AS", // China, People's Republic of
  TWN: "AS", // Taiwan
  CXR: "AS", // Christmas Island
  CCK: "AS", // Cocos (Keeling) Islands
  COL: "SA", // Colombia, Republic of
  COM: "AF", // Comoros, Union of the
  MYT: "AF", // Mayotte
  COG: "AF", // Congo, Republic of the
  COD: "AF", // Congo, Democratic Republic of the
  COK: "OC", // Cook Islands
  CRI: "NA", // Costa Rica, Republic of
  HRV: "EU", // Croatia, Republic of
  CUB: "NA", // Cuba, Republic of
  CYP: "EU", // Cyprus, Republic of
  CZE: "EU", // Czech Republic
  BEN: "AF", // Benin, Republic of
  DNK: "EU", // Denmark, Kingdom of
  DMA: "NA", // Dominica, Commonwealth of
  DOM: "NA", // Dominican Republic
  ECU: "SA", // Ecuador, Republic of
  SLV: "NA", // El Salvador, Republic of
  GNQ: "AF", // Equatorial Guinea, Republic of
  ETH: "AF", // Ethiopia, Federal Democratic Republic of
  ERI: "AF", // Eritrea, State of
  EST: "EU", // Estonia, Republic of
  FRO: "EU", // Faroe Islands
  FLK: "SA", // Falkland Islands (Malvinas)
  SGS: "AN", // South Georgia and the South Sandwich Islands
  FJI: "OC", // Fiji, Republic of the Fiji Islands
  FIN: "EU", // Finland, Republic of
  ALA: "EU", // Åland Islands
  FRA: "EU", // France, French Republic
  GUF: "SA", // French Guiana
  PYF: "OC", // French Polynesia
  ATF: "AN", // French Southern Territories
  DJI: "AF", // Djibouti, Republic of
  GAB: "AF", // Gabon, Gabonese Republic
  GEO: "AS", // Georgia
  GMB: "AF", // Gambia, Republic of the
  PSE: "AS", // Palestinian Territory, Occupied
  DEU: "EU", // Germany, Federal Republic of
  GHA: "AF", // Ghana, Republic of
  GIB: "EU", // Gibraltar
  KIR: "OC", // Kiribati, Republic of
  GRC: "EU", // Greece, Hellenic Republic
  GRL: "NA", // Greenland
  GRD: "NA", // Grenada
  GLP: "NA", // Guadeloupe
  GUM: "OC", // Guam
  GTM: "NA", // Guatemala, Republic of
  GIN: "AF", // Guinea, Republic of
  GUY: "SA", // Guyana, Co-operative Republic of
  HTI: "NA", // Haiti, Republic of
  HMD: "AN", // Heard Island and McDonald Islands
  VAT: "EU", // Holy See (Vatican City State)
  HND: "NA", // Honduras, Republic of
  HKG: "AS", // Hong Kong, Special Administrative Region of China
  HUN: "EU", // Hungary, Republic of
  ISL: "EU", // Iceland, Republic of
  IND: "AS", // India, Republic of
  IDN: "AS", // Indonesia, Republic of
  IRN: "AS", // Iran, Islamic Republic of
  IRQ: "AS", // Iraq, Republic of
  IRL: "EU", // Ireland
  ISR: "AS", // Israel, State of
  ITA: "EU", // Italy, Italian Republic
  CIV: "AF", // Côte d'Ivoire, Republic of
  JAM: "NA", // Jamaica
  JPN: "AS", // Japan
  KAZ: "EU", // Kazakhstan, Republic of
  JOR: "AS", // Jordan, Hashemite Kingdom of
  KEN: "AF", // Kenya, Republic of
  PRK: "AS", // Korea, Democratic People's Republic of
  KOR: "AS", // Korea, Republic of
  KWT: "AS", // Kuwait, State of
  KGZ: "AS", // Kyrgyz Republic
  LAO: "AS", // Lao People's Democratic Republic
  LBN: "AS", // Lebanon, Lebanese Republic
  LSO: "AF", // Lesotho, Kingdom of
  LVA: "EU", // Latvia, Republic of
  LBR: "AF", // Liberia, Republic of
  LBY: "AF", // Libyan Arab Jamahiriya
  LIE: "EU", // Liechtenstein, Principality of
  LTU: "EU", // Lithuania, Republic of
  LUX: "EU", // Luxembourg, Grand Duchy of
  MAC: "AS", // Macao, Special Administrative Region of China
  MDG: "AF", // Madagascar, Republic of
  MWI: "AF", // Malawi, Republic of
  MYS: "AS", // Malaysia
  MDV: "AS", // Maldives, Republic of
  MLI: "AF", // Mali, Republic of
  MLT: "EU", // Malta, Republic of
  MTQ: "NA", // Martinique
  MRT: "AF", // Mauritania, Islamic Republic of
  MUS: "AF", // Mauritius, Republic of
  MEX: "NA", // Mexico, United Mexican States
  MCO: "EU", // Monaco, Principality of
  MNG: "AS", // Mongolia, Mongolian People's Republic
  MDA: "EU", // Moldova, Republic of
  MNE: "EU", // Montenegro, Republic of
  MSR: "NA", // Montserrat
  MAR: "AF", // Morocco, Kingdom of
  MOZ: "AF", // Mozambique, Republic of
  OMN: "AS", // Oman, Sultanate of
  NAM: "AF", // Namibia, Republic of
  NRU: "OC", // Nauru, Republic of
  NPL: "AS", // Nepal, State of
  NLD: "EU", // Netherlands, Kingdom of the
  ANT: "NA", // Netherlands Antilles
  CUW: "NA", // Curaçao
  ABW: "NA", // Aruba
  SXM: "NA", // Sint Maarten (Netherlands)
  BES: "NA", // Bonaire, Sint Eustatius, and Saba
  NCL: "OC", // New Caledonia
  VUT: "OC", // Vanuatu, Republic of
  NZL: "OC", // New Zealand
  NIC: "NA", // Nicaragua, Republic of
  NER: "AF", // Niger, Republic of the
  NGA: "AF", // Nigeria, Federal Republic of
  NIU: "OC", // Niue
  NFK: "OC", // Norfolk Island
  NOR: "EU", // Norway, Kingdom of
  MNP: "OC", // Northern Mariana Islands, Commonwealth of the
  UMI: "OC", // United States Minor Outlying Islands
  FSM: "OC", // Micronesia, Federated States of
  MHL: "OC", // Marshall Islands, Republic of the
  PLW: "OC", // Palau, Republic of
  PAK: "AS", // Pakistan, Islamic Republic of
  PAN: "NA", // Panama, Republic of
  PNG: "OC", // Papua New Guinea
  PRY: "SA", // Paraguay, Republic of
  PER: "SA", // Peru, Republic of
  PHL: "AS", // Philippines, Republic of the
  PCN: "OC", // Pitcairn Islands
  POL: "EU", // Poland, Republic of
  PRT: "EU", // Portugal, Portuguese Republic
  GNB: "AF", // Guinea-Bissau, Republic of
  TLS: "AS", // Timor-Leste, Democratic Republic of
  PRI: "NA", // Puerto Rico
  QAT: "AS", // Qatar, State of
  REU: "AF", // Réunion
  ROU: "EU", // Romania
  RUS: "EU", // Russian Federation
  RWA: "AF", // Rwanda, Republic of
  BLM: "NA", // Saint Barthélemy
  SHN: "AF", // Saint Helena
  KNA: "NA", // Saint Kitts and Nevis
  AIA: "NA", // Anguilla
  LCA: "NA", // Saint Lucia
  MAF: "NA", // Saint Martin (France)
  SPM: "NA", // Saint Pierre and Miquelon
  VCT: "NA", // Saint Vincent and the Grenadines
  SMR: "EU", // San Marino, Republic of
  STP: "AF", // Sao Tome and Principe, Democratic Republic of
  SAU: "AS", // Saudi Arabia, Kingdom of
  SEN: "AF", // Senegal, Republic of
  SRB: "EU", // Serbia, Republic of
  SYC: "AF", // Seychelles, Republic of
  SLE: "AF", // Sierra Leone, Republic of
  SGP: "AS", // Singapore, Republic of
  SVK: "EU", // Slovakia (Slovak Republic)
  VNM: "AS", // Vietnam, Socialist Republic of
  SVN: "EU", // Slovenia, Republic of
  SOM: "AF", // Somalia, Somali Republic
  ZAF: "AF", // South Africa, Republic of
  ZWE: "AF", // Zimbabwe, Republic of
  ESP: "EU", // Spain, Kingdom of
  SSD: "AF", // South Sudan, Republic of
  ESH: "AF", // Western Sahara
  SDN: "AF", // Sudan, Republic of
  SUR: "SA", // Suriname, Republic of
  SJM: "EU", // Svalbard & Jan Mayen Islands
  SWZ: "AF", // Eswatini, Kingdom of
  SWE: "EU", // Sweden, Kingdom of
  CHE: "EU", // Switzerland, Swiss Confederation
  SYR: "AS", // Syrian Arab Republic
  TJK: "AS", // Tajikistan, Republic of
  THA: "AS", // Thailand, Kingdom of
  TGO: "AF", // Togo, Togolese Republic
  TKL: "OC", // Tokelau
  TON: "OC", // Tonga, Kingdom of
  TTO: "NA", // Trinidad and Tobago, Republic of
  ARE: "AS", // United Arab Emirates
  TUN: "AF", // Tunisia, Tunisian Republic
  TUR: "EU", // Turkey, Republic of
  TKM: "AS", // Turkmenistan
  TCA: "NA", // Turks and Caicos Islands
  TUV: "OC", // Tuvalu
  UGA: "AF", // Uganda, Republic of
  UKR: "EU", // Ukraine
  MKD: "EU", // North Macedonia, Republic of
  EGY: "AF", // Egypt, Arab Republic of
  GBR: "EU", // United Kingdom of Great Britain & Northern Ireland
  GGY: "EU", // Guernsey, Bailiwick of
  JEY: "EU", // Jersey, Bailiwick of
  IMN: "EU", // Isle of Man
  TZA: "AF", // Tanzania, United Republic of
  USA: "NA", // United States of America
  VIR: "NA", // United States Virgin Islands
  BFA: "AF", // Burkina Faso
  URY: "SA", // Uruguay, Eastern Republic of
  UZB: "AS", // Uzbekistan, Republic of
  VEN: "SA", // Venezuela, Bolivarian Republic of
  WLF: "OC", // Wallis and Futuna
  WSM: "OC", // Samoa, Independent State of
  YEM: "AS", // Yemen
  ZMB: "AF", // Zambia, Republic of
  ARB: "AS",
  CEB: "AS",
  CHI: "AS",
  CSS: "OC",
  EAP: "AS",
  EAR: "AF",
  EAS: "AS",
  ECA: "EU",
  ECS: "EU",
  EMU: "EU",
  EUU: "EU",
  FCS: "AF",
  HIC: "OTHERS",
  HPC: "OTHERS",
  IBD: "OTHERS",
  IBT: "OTHERS",
  IDA: "OTHERS",
  IDB: "OTHERS",
  IDX: "OTHERS",
  INX: "OTHERS",
  LAC: "NA",
  LCN: "NA",
  LDC: "AF",
  LIC: "AF",
  LMC: "OTHERS",
  LMY: "AF",
  LTE: "OTHERS",
  MEA: "AF",
  MIC: "OTHERS",
  MNA: "AF",
  NAC: "NA",
  OED: "OTHERS",
  OSS: "OTHERS",
  PRE: "OTHERS",
  PSS: "OTHERS",
  PST: "OTHERS",
  SAS: "AS",
  SSA: "AF",
  SSF: "AF",
  SST: "OTHERS",
  TEA: "AS",
  TEC: "OTHERS",
  TLA: "NA",
  TMN: "AS",
  TSA: "AS",
  TSS: "OTHERS",
  UMC: "OTHERS",
  WLD: "OTHERS",
  XKX: "EU",
};
export default countryToContinent;
