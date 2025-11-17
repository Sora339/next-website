import { XMLParser } from "fast-xml-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import Heading from "@/app/components/layout/heading/heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "@/app/components/layout/pageWrapper";

export const metadata: Metadata = {
	title: "YouTube動画",
	description: "AIM Commonsが作成している配信動画の一覧です",
	openGraph: {
		title: "YouTube動画",
		description: "AIM Commonsが作成している配信動画の一覧です",
	},
	twitter: {
		title: "YouTube動画",
		description: "AIM Commonsが作成している配信動画の一覧です",
	},
};

type VideoId = string;
type Entry = {
	"yt:videoId": string;
	title: string;
};

const moviePage = async () => {
	const xmlFileUrl =
		"https://www.youtube.com/feeds/videos.xml?channel_id=UCPvxIswjXQ1VU2H3WyBss8w";

	const response = await fetch(xmlFileUrl, {
		cache: "no-store",
	});
	const xmlText = await response.text();
	const parser = new XMLParser();
	const jsonObj = parser.parse(xmlText);

	const entries: Entry[] = jsonObj.feed.entry;

	const shortVideoIds: VideoId[] = [];

	for (const entry of entries) {
		const videoId = entry["yt:videoId"];
		if (entry.title.toLowerCase().includes("shorts")) {
			shortVideoIds.push(videoId);
		}
	}

	// 先頭15このショート動画だけを表示
	const latestShortVideoIds = shortVideoIds.slice(0, 15);

	return (
		<PageWrapper>
			<Heading
				engTitle="MOVIES"
				jpTitle="YouTube動画"
				abst="AIM Commons配信動画一覧"
			/>
			<div className="mx-auto mb-[6vh]">
				<div className="w-full bg-[#F0EBDC]">
					<div className="rounded-lg bg-white 2lg:p-12 p-8 3xl:px-[4%] xs:px-[20%] md:p-12 lg:px-[12%] xl:px-[8%] 2xl:px-12">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
							{latestShortVideoIds.map((videoId) => (
								<div key={`video-${videoId}`} className="flex">
									<iframe
										className="aspect-[9/16] w-full"
										src={`https://www.youtube.com/embed/${videoId}`}
										title={`Video - ${videoId}`}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<Button className="mx-auto mt-[2%] block rounded-lg bg-red-600 px-4 py-2 font-bold text-lg text-white">
				<Link
					href="https://www.youtube.com/channel/UCPvxIswjXQ1VU2H3WyBss8w"
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-1"
				>
					すべての動画を見るにはこちら
					<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
				</Link>
			</Button>
		</PageWrapper>
	);
};

export default moviePage;
