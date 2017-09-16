const tables = [{
  name: "Weapon",
  symbol: "crossed_swords",
  chances: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0.2, 13, 0.525],
    [0.175, 14, 0.455],
    [0.15, 15, 0.375],
    [0.125, 16, 0.325],
    [0.1, 18, 0.235],
    [0.075, 20, 0.201],
    [0.05, 25, 0.175],
    [0.025, 25, 0.15],
    [0.15, 25, 0.525, "PRI"],
    [0.075, 35, 0.3375, "DUO"],
    [0.05, 44, 0.27, "TRI"],
    [0.02, 90, 0.25, "TET"],
    [0.015, 124, 0.201, "PEN"],
  ],
}, {
  name: "Armor",
  symbol: "shield",
  chances: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [0.2, 13, 0.525],
    [0.175, 14, 0.455],
    [0.1625, 14, 0.4075],
    [0.15, 15, 0.375],
    [0.125, 16, 0.325],
    [0.1125, 17, 0.2825],
    [0.1, 18, 0.235],
    [0.075, 20, 0.201],
    [0.05, 25, 0.175],
    [0.025, 25, 0.15],
  ],
}, {
  name: "Accessory",
  symbol: "ring",
  chances: [
    [0.15, 25, 0.525, "PRI"],
    [0.075, 35, 0.3375, "DUO"],
    [0.05, 44, 0.27, "TRI"],
    [0.02, 90, 0.245, "TET"],
    [0.015, 124, 0.325, "PEN"],
  ],
},
];

function percent(chance) {
  return `${parseFloat((chance * 100).toFixed(2))}%`;
}

function calcChances(item, fsc) {
  if (item[1] > 0) {
    const fs = fsc > item[1] ? item[1] : fsc;
    const chancePerFs = (item[2] - item[0]) / item[1];
    const chance = item[0] + (fs * chancePerFs);
    return `Enchant Chance: **${percent(chance)}**` +
      `\n *(${percent(chancePerFs)} per FS)*` +
      `\nMax. Chance: **${percent(item[2])}**` +
      `\n *(${item[1]} FS)*`;
  }
  return "Enchant Chance: **100%**";
}

function addTable(table, embed, eml, fsc) {
  const item = table.chances[eml];
  if (item !== undefined) {
    const val = calcChances(item, fsc);
    let name = `${table.name} +${eml + 1} :${table.symbol}:`;
    if (item[3] !== undefined) {
      name = `${table.name} ${item[3]} *(+${eml + 1})* :${table.symbol}:`;
    }
    embed.addField(name, val, true);
  }
  return embed;
}

function initEmbed(embed, eml, fsc) {
  embed.setTitle(":arrow_double_up: Failstack Calculator");
  embed.setDescription(`Enchantment Level **+${eml}**` +
    `\nFailstack Count **${fsc}**`);
  embed.setColor(0xffffff);
  return embed;
}

exports.run = (client, msg, [enchantLevel, failstackCount = 0]) => {
  let embed = new client.methods.Embed();
  embed = initEmbed(embed, enchantLevel, failstackCount);
  tables.forEach((table) => {
    embed = addTable(table, embed, enchantLevel, failstackCount);
  });

  return msg.reply(embed);
};

exports.help = {
  name: "failstacks",
  description: "Failstack Calculator",
  usage: "<enchant_level:int{0,19}> [failstack_count:int{0,999}]",
  extendedHelp: "Use your current enchantment level and failstack count.",
  usageDelim: " ",
  type: "commands"
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["failstack", "fs"],
  permLevel: 0,
  botPerms: ["EMBED_LINKS"],
  requiredFuncs: [],
  requiredSettings: [],
};
