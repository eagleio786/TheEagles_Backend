const { Id1Schema } = require("./Database");

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const Id1SchemaFunction = async () => {
  try {
    let random24hrPartners = randomInRange(4, 11);
    let random24hrTeam = randomInRange(150, 250);

    const addValue = random24hrPartners * 5 + randomInRange(20, 50);
console.log("values in function are 24 hour partners=",random24hrPartners,"values in function are random 24 hr team",random24hrTeam,"random add value",addValue);

    // Chec
    const existing = await Id1Schema.findOne({});
    let updatedEntry;
    if (!existing) {
      // First time: apply default + increment
      updatedEntry = await Id1Schema.create({
        TotalProfit: 25418 + addValue,
        DailyProfit: addValue,
        partners: 1289 + random24hrPartners,
        Hr24partners: random24hrPartners,
        TeamMembers: 25445 + random24hrTeam,
        hr24TeamMembers: random24hrTeam,
      });
    } else {
      // Subsequent runs: just increment
      updatedEntry = await Id1Schema.findOneAndUpdate(
        {},
        {
          $inc: {
            TotalProfit: addValue,
            DailyProfit: addValue,
            partners: random24hrPartners,
            TeamMembers: random24hrTeam,
          },
          $set: {
            Hr24partners: random24hrPartners,
            hr24TeamMembers: random24hrTeam,
          },
        },
        { new: true }
      );
    }

    console.log("✅ Data updated:", updatedEntry.toObject());
  } catch (error) {
    console.error("❌ Error in pushDataToDB:", error);
  }
};


module.exports = { Id1SchemaFunction };
