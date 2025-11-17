"use client";
type Props = {
	shortVideoIds: string[];
};

export default function SwitchMovieType({ shortVideoIds }: Props) {
	return (
		<div className="w-full bg-[#F0EBDC]">
			<div
				className="rounded-lg bg-white 2lg:p-12 p-8 3xl:px-[4%] xs:px-[20%] md:p-12 lg:px-[12%] xl:px-[8%] 2xl:px-12"
			>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
					{shortVideoIds.map((videoId) => (
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
	);
}
