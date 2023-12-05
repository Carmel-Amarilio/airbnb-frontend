
import axios from "axios";
import { utilService } from "./util.service";
import { cloudinaryServices } from "./cloudinary-service";

const stayNames = ["Serene Summit Retreat", "Coastal Oasis Haven", "Tranquil Meadow Hideaway", "Sunset Bliss Villa", "Enchanting Pine Lodge", "Harbor View Sanctuary", "Rustic Canyon Cabin", "Whispering Pines Cottage", "Crystal Cove Retreat", "Secret Garden Bungalow", "Majestic Mountain Lodge", "Azure Skyline Chalet", "Moonlit Meadows Cottage", "Seaside Serenity Lodge", "Alpine Horizon Haven", "Golden Sands Villa", "Twilight Terrace Getaway", "Mountain Majesty Mansion", "Emerald Valley Manor", "Lakeside Tranquility Cottage", "Hidden Gem Chalet", "Velvet Valley Villa", "Cascading Falls Lodge", "Celestial Skies Sanctuary", "Evergreen Escape Cabin", "Starry Night Villa", "Sunrise Summit Chalet", "Blissful Brookside Retreat", "Valley Vista Hideout", "Harmony Hills Cottage", "Whispering Willows Villa", "Coastal Breeze Haven", "Pinecrest Paradise Lodge", "Tranquil Treetop Retreat", "Serendipity Springs Cabin", "Moonshadow Manor", "Azure Haven Villa", "Crystal Creek Cottage", "Enchanted Forest Lodge", "Mountain Mist Manor", "Seafoam Serenity Villa", "Sunset Splendor Cottage", "Riverside Respite Lodge", "Meadow Magic Mansion", "Wildflower Whisper Chalet", "Oceanfront Opulence Retreat", "Velvet Vista Villa", "Alpine Amber Cottage", "Horizon Heights Haven", "Reflections Retreat Lodge"];
const type = ["An entire place", "A private room", "A shared room"]
const summary = ["Secluded mountain retreat with breathtaking views. Perfect for a romantic getaway.", "Charming cottage by the beach, offering a cozy atmosphere and stunning sunsets.", "Luxurious villa surrounded by nature, featuring a private pool and spa.", "Historic downtown loft with modern amenities, steps away from vibrant nightlife.", "Elegant lakeside mansion with spacious rooms and a tranquil garden.", "Quaint countryside cabin, ideal for nature lovers seeking peace and serenity.", "Contemporary urban oasis in the heart of the city, close to shopping and dining.", "Rustic log cabin with a fireplace, nestled in a quiet forest setting.", "Beachfront paradise with panoramic ocean views and a private sundeck.", "Architect-designed loft showcasing artistic interiors and skyline vistas.", "Spacious family-friendly house with a backyard, near parks and attractions.", "Sleek and modern apartment in a high-rise building, offering city skyline views.", "Historical manor with period furnishings, providing a unique cultural experience.", "Sunny retreat in a vineyard, perfect for wine enthusiasts and relaxation.", "Cozy treehouse with a wrap-around balcony, offering a bird's-eye view of nature.", "Tranquil desert escape featuring a pool, hot tub, and stargazing opportunities.", "Eco-friendly bungalow with sustainable practices, close to hiking trails.", "Picturesque farmhouse with a vintage charm, surrounded by rolling hills.", "Chic loft in an artsy district, steps away from galleries and trendy cafes.", "Seaside cottage with nautical decor and direct access to the beach.", "Mountain chalet with a fireplace, providing a cozy retreat after skiing.", "Elevated city penthouse with floor-to-ceiling windows and modern amenities.", "Historic plantation house with southern charm, nestled in a lush garden.", "Serenity by the river, offering a peaceful escape and wildlife viewing.", "Modern townhouse in a lively neighborhood, close to entertainment options.", "Tranquil island villa with a private pool, surrounded by tropical landscapes.", "Ski-in/ski-out lodge with mountain views, perfect for winter sports enthusiasts.", "Urban sanctuary in a bustling metropolis, with a rooftop terrace for relaxation.", "Secluded lakeside cabin, providing a quiet retreat for fishing and nature walks.", "Charming cottage surrounded by lavender fields, ideal for a romantic weekend.", "Artistic studio loft in a bohemian district, filled with creativity and character.", "Tree-lined street apartment with a vintage flair, near local shops and cafes.", "Private hacienda with a courtyard, capturing the essence of Spanish architecture.", "Mountain view retreat with a hot tub, offering a serene escape from the city.", "Mansion on the hilltop with panoramic city lights, perfect for special occasions.", "Riverside cabin with a fireplace, providing a cozy setting for all seasons.", "Luxury beach house with a private dock, steps away from the surf and sand.", "Modern A-frame chalet with a minimalist design, surrounded by pine forests.", "Historical brownstone with elegant interiors, close to cultural landmarks.", "Tropical paradise villa with lush gardens and a pool, minutes from the beach.", "Rustic barn conversion with exposed beams, offering a unique countryside stay.", "Glamorous Hollywood Hills mansion with a pool, ideal for a star-studded getaway.", "Secluded yurt in the wilderness, providing a unique glamping experience.", "Modernist apartment with sleek design, located in a trendy urban neighborhood.", "Countryside castle with turrets and a moat, offering a fairytale-like stay.", "Island hideaway with overwater bungalows, surrounded by crystal-clear waters.", "Chic and cozy boathouse with panoramic lake views, perfect for water enthusiasts.", "Historical lighthouse converted into a charming residence, perched on the cliffs."];
// const staysImgUrls = await getStaysImg()
// const profileUrls = await getProfileImg()
const staysImgUrls = ['http://res.cloudinary.com/du1jrse2t/image/upload/v1701719048/fadhmoiasyjarzedabsc.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719062/qf38fdsfwyvcqgj2tx6o.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719066/esmo8gfuge8adhkvkfqd.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719067/iedd0uufj3zngzooast4.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719071/oomk4wjtiubklqs2cwro.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719082/vkdfx2snmctkcms4vwix.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719084/xwnd1cre8lfjouimh5jj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719089/nru4i8f6uxqhz3rlsomu.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719092/secuimzzr2ag5vsxukwn.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719095/nyofdmslzuw5plxefapa.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719102/t14ggtsylfxuqdylxl9p.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719112/whrojuysjwucjvb1yre5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719114/mgwnwkpsnokpjff17dng.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719114/tswofynj84jwgmd7mijj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719130/upy1djgs7xgsqng4bqsq.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719135/el5du1mjshhs2ssdhsx2.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719137/hrb6edbtxfxdbulrtxon.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719136/dtaanl2secdvrlsips5b.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719139/vj0jn09xuatik5wootjx.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719139/sy4ln7cgrku1rkrhlicx.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719156/lw2ddmjpu0lnkuxs84fw.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719161/yvlsfrzo9inio3u6xlj8.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719161/xment8nnhcdiu9vnez0b.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719164/cc49pbzdv4qufhue3rtk.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719183/imiw6ibhrowcrpquhenp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719185/b1t486c2uzkwk7ouaasw.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719185/e6nvvesbcyjmmxbcclvp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719187/qj3nnrevggb08yabts4w.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719190/hkw5lduf6ch2ew2tim9v.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719196/kc5rcnah043jqchsceyy.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719204/trj4ni6mz4tuabkfrh8x.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719210/s9lpnlfdaxbtnsb2jq5h.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719215/anwboenvskgxj8ut5ejv.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719218/fen7hblq7rywo4vvsjwn.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719224/vkkzccp8iv8tscvczm6h.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719224/l4nuwkcadyk4nnpway4i.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719226/wzdul6g6sftoiunkkvlg.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719226/yvrop2yda54gsoy0epzu.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719228/mcrtgpemtujv65ailvkj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719230/etbaqgxy8by6clqyxtri.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719244/tndgqd5swybgphthuyju.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719253/fv5rn1tiv89xm8o48lud.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719256/ayv9ipbccoydavxpajbz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719257/xjl1fdm50qezcajgotd4.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719259/xucnyzmqk0msdx9afxk0.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719264/d2gpdofie8onu3bwwrug.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719266/tadtdnestncga6yaibaw.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719266/znx0bepdhqweoshuwz64.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719267/iwdpapdw5gcjtekfrraq.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719268/tntk4oyffeabsbjhg51c.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719277/snfgdmh7cwglhvgpvxvz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719281/r82bsmjmlydbbabgk2xg.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719281/yccqpkyreotihyk7v8tr.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719289/i63vcrvkxy5qqr9exgn5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719291/nrzxlor82jbinast8um5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719293/dditzglzglj0j2xlaqhg.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719296/ycycp86clw1rnljikwmw.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719301/kkf7qqa0bzfzayma9qha.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719307/linf2dhozzcoogzn0hmj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719307/umzurs3z7tri4h8kqeoy.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719312/odb3wxxfohwpunsf6391.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719317/frbanpmyyqelfu9zrj5h.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719325/wwcpywjp741c3rcwdxqu.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719328/dikm88tjsxu7x0gjqpmr.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719328/n4pyucxmyoelvcvgyik8.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719329/tpq0ef5clp1xzoi3fz8m.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719330/cm2djwddyljpz9gvgaj7.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719337/dq2ptgdfyca25wfebzqz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719344/obvgmuzdpurpdmgbb7cl.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719345/g9vhj5kvvinkkj3e53bf.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719350/euhsravr0zjxrwmynphp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719355/fcr4jqmglc8tlucr9yaq.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719369/nelk8zjuouo7hf9sxiwm.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719377/wsxkweume2ncrwj3hm8t.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719378/xo5q111mixbxu2lzvh9n.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719382/of0s583x3jd89lfibbcy.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719384/gnh7vilc7qmhkhawnq6x.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719392/zpggrwunxoffcu7wukw1.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719394/iauv3uqkw8fw1kgmnu0i.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719395/fbgilmmbnzcoafslfkfj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719414/hh6xafn4isvv8mgopahn.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719415/h1tdv89chr28ae0y05oz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719418/a12buafyphjekxg6ljpp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719423/seqsxkhyodwgup0qx4lg.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719424/nxkcqbgwxj7d1kgd02uh.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719430/vyskhwl1gtsnqa6266fl.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719431/meiyokpztllrthl5rvqq.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719435/zhp7jzxv90xcb4yswaad.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719436/mopejpynlvptat4pwvjj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719439/iwetm7gcz4jvvw9wcgca.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719454/ooge78yaxyl2katkd0ig.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719463/nuf0i9obeh5ylupufhr8.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719465/rewcdhsjdhyen6gt5r98.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719467/gz6tqgi8lj94x6fxxbl3.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719470/vz3cxofvstxrwyvfzx35.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719473/pzofaqlrxejb4dfccup5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719475/eqws3nvm3zavearvhttl.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719485/pf4eyvitsoswh1jhnnn3.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719487/edka69gsltvk9o2tfzex.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719491/tcefw4jizy24tdfihyka.jpg']
const profileUrls = ['http://res.cloudinary.com/du1jrse2t/image/upload/v1701719666/fphpses5vgo7v2e4npjn.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719671/ivav6cnr5yfhusl7ig9m.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719675/j10ukj7hjtj1ooy4ei4o.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719682/y8zcvk3umau9xp9wjm5d.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719682/irty1qcdz7dbsgumjb45.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719686/im2agg4ggx7xyqdihxy0.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719687/xe8gvzxjtuyl33vmr2uk.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719691/xon0qxganjpagte9u14h.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719693/ha8carczfzfxx9i1wn9v.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719698/rhklz9izstaty2qkw76h.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719700/oavjzqtrjsxifkoskfh0.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719706/fhwvix6d3zmsi8b9w7d1.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719707/jfcopps2ynp7tb4k5u6q.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719711/qlnhhxom0ebjtxwm0kzl.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719721/ofpela0auhxj5csoelw0.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719722/uktqtk3e2jdy2jot4xuo.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719733/cwkdqmdathh9wb7ujj3q.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719733/dtgp03554zgnwpwb7x0z.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719738/h4joufjlznqshkrpp73f.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719746/ebeieubraheg186mrvoo.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719756/nfekhpa4jmibilci0mxj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719761/pviaad1naijjwgjrahxj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719763/pql3gbb1cudb63ymbmzi.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719763/wmgkexbjtpio5rjiebdm.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719770/eooiwhwhudftesyalc7d.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719772/rvjhqdmmmuuv7otackvx.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719773/jf7pwa1eupz9jamugegu.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719774/wnyca6cttwg20bd2urj5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719783/cakq8xah3qctmx48oicr.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719784/iapebmn325ssgm0emtre.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719792/bxp7068xo1qpyppkubkv.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719801/ghdu8lqcvqht4ye824nb.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719801/ive74fx2duo3qtwox2f3.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719804/quzjgqm6bttrhrxcih3m.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719804/qgwx1ibvozibw6bbmxzs.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719808/o7yaqhbdwdvftw4txs9o.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719808/dwd2rzc5mhmgylb8h2yl.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719812/k7gofcdgwhbmkuu0vrvj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719817/dx9ydadoc0rjnhyijrgy.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719818/qqldo30wwi96lttga5zq.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719823/fez6bzkpcfsocrgnqgms.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719834/hqzosdmn2cuwivpasdri.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719848/ri9ssokbjkxjjkfpwtrp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719857/elsi2tkkzqfsqwkarijf.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719862/gypar9qe4alehvbnmwf2.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719868/dvvfh9zr8ndfw72e7fha.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719870/pr7fxbs3wkhrdge6g74x.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719877/xypmt1zmuxglpvggl85s.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719877/ejjqewttig4wceakd4l5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719878/w6e47kou3codn4ciyyei.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719884/ualfifsslr8pfx339gia.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719884/sidkytwi53lanmhm3wmf.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719888/mhvxsqvt4rvtnntwalct.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719892/dbgivno2ftfh2q6rps4f.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719892/rj2jrvuxf2fkp68cg7xe.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719896/xx0hjeighdytmiiu3jkc.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719904/p9uuevb4ri8ouvutakoi.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719911/jog5iahys8kpsukrlj7a.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719913/uzw5izwqdr6r2ysaupqt.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719914/kzabpjasm0vsmwlgzmlc.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719928/du6zmgihkgs3fedubbik.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719929/cabe0djhaalw1nafs3tm.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719932/gvz3phqhumzpffzebqkr.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719937/sjbpaivovfvhadfocohv.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719937/kc5ssoxrovtpxmmttumn.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719939/qsunmixxvpxmmkgdjqz5.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719939/ii9ivh7igfzwv6axtnca.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719943/t5mg8d4tpwpkyk4hocd9.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719951/gjkpntb1n4mu90by3g7j.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719955/apiymtpdvcquqsrqxwp8.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719958/jya9n3iluhqssprts8nz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719960/tddjgy9ypdhmtkbl2ugk.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719970/olrwxii18dmbamvptww7.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719971/w6qijs0uafyhxis1ivr4.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719987/oi2cbrx1hdcdkk4zuhxp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719990/d5zvorgdojhm8wmgaoyz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719991/qclz3pfgcli7usjirohw.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719993/zq0i64yhutcjraccjdva.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719998/sniyjhaqybxnsu5ucui0.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701719998/kym6v6cbwtbnly465x5k.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720010/cbt7qq9qiuuazcmdovjc.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720015/ltsfhvemtxcnbdkpn1in.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720025/jtdda4vwguuuoqb3cgbz.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720030/his6dgbivz49fkdeifno.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720037/qragcqnmxkr0eagl6bxj.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720039/hul47dohucjdib5oimeh.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720041/dm368oplseqr5n3gstsy.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720042/ivxzqe6twf9idmkzmi3d.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720044/ewhjt4l2lmgorkkpnzhp.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720046/k5hpkjrdfi8gi46s5ef8.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720066/dk9fdt90lny8cokchcfa.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720067/tqxzghs4wvojtcbrjyfa.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720068/lvdc5zlbkwq66sm8zaoc.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720077/mu7kbipd4beaa0pnd2m3.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720082/zzsfzbi8phhwa1sviske.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720085/htgivjopezosx5lbccur.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720094/bz2oebuclzupve5kco3k.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720096/s3i41mmdntatrgmhwegx.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720103/ogpjhblwnc9yndvbrfo1.jpg', 'http://res.cloudinary.com/du1jrse2t/image/upload/v1701720113/boedjd77q2nyyjofskd1.jpg']
const amenities = ['TV', 'Wifi', 'Air conditioning', 'Kitchen', 'Paid parking off premises', 'Free street parking', 'Washer', 'Smoke detector', 'First aid kit', 'Fire extinguisher', 'Essentials', 'Shampoo', 'Hangers', 'Hair dryer', 'Iron', 'Laptop friendly workspace', 'Private entrance', 'Crib', 'Room-darkening shades', 'Hot water', 'Bed linens', 'Extra pillows and blankets', 'Microwave', 'Coffee maker', 'Refrigerator', 'Dishwasher', 'Dishes and silverware', 'Cooking basics', 'Oven', 'Stove', 'Patio or balcony', 'Long term stays allowed', 'Step-free access', 'Host greets you', 'Paid parking on premises', 'Smoking allowed']
const labels = ['All', 'Amazing views', "Chef's kitchens", 'Luxe', 'Ski-in/out', 'Private rooms', 'Cabins', 'Countryside', 'Farms', 'Lakefront', 'Tiny homes', 'Off-the-grid', 'Beach', 'Beachfront', 'Tropical', 'Lake', 'National parks', 'Creative spaces', 'Desert', 'Caves', 'Camping', 'A-frames', 'Surfing', 'Containers', 'Domes', 'Windmills', 'Barns', 'Towers', "Shepherd's hut", 'Campers', 'Skiing']
const fullNames = ["John Smith", "Emma Johnson", "Michael Davis", "Sophia Brown", "Christopher Wilson", "Ava Miller", "William Anderson", "Olivia Moore", "James Taylor", "Isabella Jackson", "Daniel Harris", "Mia Thompson", "David Martinez", "Emily White", "Joseph Davis", "Abigail Garcia", "Andrew Robinson", "Charlotte Davis", "Alexander Miller", "Harper Johnson", "Nicholas Taylor", "Ella Wilson", "Matthew Moore", "Amelia Jackson", "Christopher Harris", "Sofia Thompson", "Brandon White", "Avery Taylor", "Tyler Garcia", "Scarlett Robinson", "Daniel Smith", "Madison Johnson", "Gabriel Davis", "Grace White", "Jackson Wilson", "Chloe Moore", "Caleb Jackson", "Lily Harris", "Mason Thompson", "Aria Garcia", "Ethan Robinson", "Layla Davis", "Logan Taylor", "Hannah Wilson", "Benjamin Moore", "Evelyn Jackson", "Zachary Harris", "Natalie Thompson", "Christopher Garcia", "Addison Robinson", "Oliver Davis", "Aurora Taylor", "Aiden Wilson", "Eli Moore", "Abigail Jackson", "Lucas Harris", "Emma Thompson", "Carter Garcia", "Ella Robinson", "Sebastian Davis", "Avery Taylor", "Leah Wilson", "Wyatt Moore", "Scarlett Jackson", "Grayson Harris", "Eleanor Thompson", "Cameron Garcia", "Zoey Robinson", "Hunter Davis", "Penelope Taylor", "Christian Wilson", "Victoria Moore", "Samantha Jackson", "Liam Harris", "Elizabeth Thompson", "Landon Garcia", "Stella Robinson", "Luke Davis", "Nova Taylor", "Julian Wilson", "Aubrey Moore", "Sarah Jackson", "Gavin Harris", "Aaliyah Thompson", "Evan Garcia", "Brooklyn Robinson", "Nathan Davis", "Luna Taylor", "Dylan Wilson", "Paisley Moore", "Alice Jackson", "Owen Harris", "Allison Thompson", "Isaac Garcia", "Hazel Robinson", "Nicholas Davis", "Bella Taylor", "Jackson Wilson", "Violet Moore", "Camila Jackson", "Leo Harris", "Avery Thompson"];
const country = ['Portugal', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'Portugal', 'Italy', 'Italy', 'Italy', 'Italy', 'Italy', 'Italy', 'Italy', 'Italy', 'Italy', 'Italy', 'United States', 'United States', 'United States', 'United States', 'United States', 'United States', 'United States', 'United States', 'United States', 'United States', 'France', 'France', 'France', 'France', 'France', 'France', 'France', 'France', 'France', 'France', 'Greece', 'Greece', 'Greece', 'Greece', 'Greece', 'Greece', 'Greece', 'Greece', 'Greece', 'Greece']
const city = ['Lisbon', 'Porto', 'Faro', 'Coimbra', 'Braga', 'Aveiro', 'Funchal', 'Évora', 'Cascais', 'Guimarães', 'Rome', 'Milan', 'Venice', 'Florence', 'Naples', 'Turin', 'Bologna', 'Genoa', 'Palermo', 'Verona', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Francisco', 'Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Rhodes', 'Ioannina', 'Chania', 'Kavala']

const txt = [
    "Absolutely stunning views! A perfect retreat for nature lovers.",
    "Cozy and charming place with excellent amenities. Loved our stay!",
    "The attention to detail in this accommodation is impressive. Highly recommended.",
    "Spacious and well-decorated rooms. The host was incredibly hospitable.",
    "Fantastic location! Close to all the attractions and dining spots.",
    "Serene atmosphere, great for relaxation. Will definitely return.",
    "Incredible stay! The interior design is stylish and comfortable.",
    "A hidden gem! The garden adds a lovely touch to the overall experience.",
    "Clean and well-maintained. The hosts were friendly and accommodating.",
    "Perfect for a romantic getaway. The sunset views were breathtaking.",
    "Wonderful stay in a quiet neighborhood. Ideal for a family vacation.",
    "Modern amenities and a beautiful outdoor space. We enjoyed every moment.",
    "Quaint and charming cottage with all the comforts of home.",
    "The host went above and beyond to make our stay special.",
    "Great value for money. Comfortable beds and a fully equipped kitchen.",
    "Fantastic location with easy access to hiking trails. Nature at its best.",
    "Impeccably clean and cozy. We felt right at home.",
    "The attention to detail is exceptional. A unique and memorable experience.",
    "Perfect weekend getaway. The hot tub was a nice added bonus.",
    "A true home away from home. Can't wait to come back.",
    "Excellent communication from the host. They made check-in a breeze.",
    "Stylish and comfortable. The stay exceeded our expectations.",
    "A dreamy retreat with beautiful interiors. Highly recommended!",
    "We had a fantastic time. The property is even better than the photos.",
    "The location is unbeatable. Walking distance to all the main attractions.",
    "Peaceful and relaxing. Just what we needed for a weekend escape.",
    "The panoramic views are mesmerizing. A photographer's paradise.",
    "Spotlessly clean and well-appointed. The hosts were friendly and helpful.",
    "Great attention to detail. The stay had a welcoming and warm ambiance.",
    "We couldn't have asked for a better place to stay. 5 stars!",
    "Lovely decor and thoughtful touches throughout the property.",
    "The outdoor space is perfect for morning coffee and evening stargazing.",
    "Central location with easy access to shops and restaurants.",
    "A true home away from home. The hosts were attentive and accommodating.",
    "Quiet and peaceful surroundings. We enjoyed every moment of our stay.",
    "The stay was spotless and well-equipped. A great base for exploring the area.",
    "Charming and comfortable. Ideal for a romantic weekend getaway.",
    "The property exceeded our expectations. We can't wait to return.",
    "We had a fantastic time. The attention to detail is outstanding.",
    "The location is perfect for those seeking a tranquil escape.",
    "Absolutely loved our stay. The cozy fireplace was a highlight.",
    "Stunning architecture and design. A memorable stay in every way.",
    "The hosts were friendly and responsive. A great experience overall.",
    "We were blown away by the beauty of the stay. Highly recommended!",
    "Perfect for a family vacation. The kids loved the outdoor space.",
    "The stay had a magical atmosphere. We felt transported to another world.",
    "Exceptional hospitality. The hosts made us feel welcome from the start.",
    "The stay was clean, comfortable, and had everything we needed.",
    "Gorgeous views and a tranquil setting. A wonderful escape from the city.",
    "The attention to detail in the design is impeccable. A true gem.",
    "We had a fabulous time. The stay is a perfect blend of comfort and style.",
    "Great location with easy access to local attractions. A wonderful stay.",
    "The hosts thought of everything to make our stay enjoyable.",
    "Spotlessly clean and beautifully decorated. A top-notch experience.",
    "A perfect romantic getaway. The stay had a dreamy and intimate ambiance.",
    "The stay was better than we could have imagined. 10/10!",
    "Beautifully furnished with all the comforts of home. We loved it!",
    "The hosts were friendly and went above and beyond to make us feel welcome.",
    "Quiet and peaceful retreat. The stay had a calming effect on us.",
    "The property is a true haven. We enjoyed every moment of our stay.",
    "Stunning architecture and thoughtful design. A truly unique experience.",
    "The stay is a true gem. We didn't want to leave!",
    "Clean, comfortable, and stylish. A great place to unwind and relax.",
    "The location is perfect for exploring the surrounding area.",
    "The stay had a cozy and welcoming atmosphere. We felt at home.",
    "We had a wonderful time. The outdoor space is perfect for relaxation.",
    "The attention to detail is outstanding. The stay is a work of art.",
    "The hosts were friendly and accommodating. A great overall experience.",
    "Beautiful stay with all the comforts of home. We'll be back!",
    "Perfect for a weekend getaway. The stay exceeded our expectations.",
    "The property is stunning. We enjoyed the peaceful surroundings.",
    "Immaculately clean and well-designed. A fantastic stay all around.",
    "The hosts were attentive and made sure we had everything we needed.",
    "A true retreat from the hustle and bustle. We left feeling refreshed.",
    "Gorgeous stay with attention to detail. The hosts were exceptional.",
    "We had an amazing time. The stay is a hidden paradise.",
    "The stay is a masterpiece of design. We were in awe the entire time.",
    "Clean, comfortable, and stylish. We couldn't have asked for more.",
    "The stay is a true oasis. Perfect for a relaxing weekend.",
    "Stylish and modern with all the amenities. A wonderful stay!",
    "The hosts were friendly and helpful. The stay had a welcoming vibe.",
    "Absolutely loved our stay. The outdoor space is a highlight.",
    "Charming and cozy with a touch of luxury. A perfect stay.",
    "The stay had everything we needed and more. Highly recommended!",
    "Beautifully decorated and well-appointed. We felt pampered throughout our stay.",
    "Perfect location with easy access to local attractions."]

async function getProfileImg() {
    const profileUrls = []
    for (let i = 1; i < 11; i++) {
        try {
            const res = await axios.get(`https://api.unsplash.com/search/photos?client_id=yTpny1U90SFXDXLaImHv3o-EMW59AiEaekOup0itODw&query=profile%20picture&page=${i}`)
            await Promise.all(res.data.results.map(async (img) => {
                const imgUrl = await cloudinaryServices.uploadUrlImg(img.urls.full)
                profileUrls.push(imgUrl)
            }))
        } catch (error) {
            console.log(error);
        }
    }
    return profileUrls
}

async function getStaysImg() {
    const staysImgUrls = []
    for (let i = 1; i < 11; i++) {
        try {
            const res = await axios.get(`https://api.unsplash.com/search/photos?client_id=yTpny1U90SFXDXLaImHv3o-EMW59AiEaekOup0itODw&query=home&page=${i}`)
            await Promise.all(res.data.results.map(async (img) => {
                const imgUrl = await cloudinaryServices.uploadUrlImg(img.urls.full)
                staysImgUrls.push(imgUrl)
            }))
        } catch (error) {
            console.log(error);
        }
    }
    return staysImgUrls
}

async function getLocation(city, country) {
    try {
        const res = await axios.get(`https://api.geoapify.com/v1/geocode/search?&street=street&city=${city}&country=${country}&lang=en&limit=5&format=json&apiKey=${"39b01718a5614cf4bc536ee0344ddee0"}`)
        return res.data.results[0]
    } catch (error) {
        console.log(error);
    }
}

function getReviews(num) {
    const reviews = []
    for (let i = 0; i < num; i++) {
        const review = {
            txt: txt[utilService.getRandomIntInclusive(0, 85)],
            rate: {
                "cleanliness": (Math.random() * 2 + 3).toFixed(1),
                "communication": (Math.random() * 2 + 3).toFixed(1),
                "check-in": (Math.random() * 2 + 3).toFixed(1),
                "accuracy": (Math.random() * 2 + 3).toFixed(1),
                "location": (Math.random() * 2 + 3).toFixed(1),
                "value": (Math.random() * 2 + 3).toFixed(1)
            },
            by: {
                _id: utilService.makeId(),
                fullName: fullNames[utilService.getRandomIntInclusive(1, 99)],
                imgUrl: profileUrls[utilService.getRandomIntInclusive(1, 99)],
            },
            at: new Date(Date.now() - Math.floor(Math.random() * 25920000000))
        }
        reviews.push(review)
    }
    return reviews
}

function getRandomUniqueObjects(array, count) {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    const uniqueObjects = Array.from(new Set(shuffledArray));
    return uniqueObjects.slice(0, count);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function createStays() {
    const newStays = []
    for (let i = 0; i < 50; i++) {
        const location = await getLocation(city[i], country[i])
        const stay = {
            name: stayNames[i],
            type: type[utilService.getRandomIntInclusive(0, 2)],
            imgUrls: [staysImgUrls[utilService.getRandomIntInclusive(0, 99)], staysImgUrls[utilService.getRandomIntInclusive(0, 99)], staysImgUrls[utilService.getRandomIntInclusive(0, 99)], staysImgUrls[utilService.getRandomIntInclusive(0, 99)], staysImgUrls[utilService.getRandomIntInclusive(0, 99)]],
            price: utilService.getRandomIntInclusive(50, 800),
            summary: summary[i],
            capacity: {
                guests: utilService.getRandomIntInclusive(1, 5),
                bedrooms: utilService.getRandomIntInclusive(1, 4),
                beds: utilService.getRandomIntInclusive(1, 4),
                bathrooms: utilService.getRandomIntInclusive(1, 3)
            },
            amenities: getRandomUniqueObjects(amenities, utilService.getRandomIntInclusive(7, 25)),
            labels: getRandomUniqueObjects(labels, utilService.getRandomIntInclusive(4, 7)),
            host: {
                _id: utilService.makeId(),
                fullName: fullNames[utilService.getRandomIntInclusive(1, 99)],
                imgUrl: profileUrls[utilService.getRandomIntInclusive(1, 99)],
            },
            loc: {
                country: location.country,
                countryCode: location['country_code'],
                city: location.city,
                street: location.city,
                houseNumber: '10',
                lat: location.lat,
                lng: location.lon
            },
            reviews: getReviews(utilService.getRandomIntInclusive(7, 25)),
            likedByUsers: [],
            DateNotAvailable: []
        }
        newStays.push(stay)
    }
    return newStays
}