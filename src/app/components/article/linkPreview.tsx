"use client";
import type { ReactNode } from "react";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import type { OgpData } from "@/types/ogp";

interface LinkPreviewProps {
	url: string;
	children: ReactNode;
}

// SWR用のフェッチャー関数
const fetcher = async (
	url: string,
): Promise<{ ogp: OgpData | null; success: boolean }> => {
	const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
	if (!response.ok) {
		throw new Error("Failed to fetch OGP data");
	}
	return response.json();
};

export function LinkPreview({ url, children }: LinkPreviewProps): JSX.Element {
	const { data, error, isLoading } = useSWR(url, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	const ogpData = data?.success && data.ogp ? { ...data.ogp, url } : null;

	if (isLoading) {
		return (
			<div className="my-4">
				<div className="block no-underline">
					<Card className="overflow-hidden">
						<div className="flex items-center sm:flex-row">
							<div className="w-[30%] sm:w-[50%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%]">
								<Skeleton className="aspect-video w-full" />
							</div>
							<CardContent className="w-full p-2 sm:p-4 sm:py-0 sm:pt-2">
								<div className="flex flex-col gap-2">
									<Skeleton className="h-4 w-1/3" />
									<Skeleton className="h-5 w-full" />
									<Skeleton className="h-5 w-4/5" />
								</div>
							</CardContent>
						</div>
					</Card>
				</div>
			</div>
		);
	}

	if (error || !ogpData) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-600 hover:underline"
			>
				{children}
			</a>
		);
	}

	return (
		<div className="my-4">
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="block no-underline"
			>
				<Card className="overflow-hidden transition-shadow hover:shadow-md">
					<div className="flex items-center sm:flex-row">
						{ogpData.image && (
							<div className="relative h-fit w-[30%] sm:w-[50%] md:w-[60%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%]">
								<Image
									src={ogpData.image}
									alt={ogpData.title || "リンクプレビュー"}
									width={500}
									height={330}
									className="my-0 aspect-square object-cover sm:aspect-video"
								/>
							</div>
						)}
						<CardContent className="w-full p-2 sm:p-4 sm:py-0 sm:pt-2">
							<div className="flex flex-col 2xl:gap-1">
								<div className="truncate text-gray-500 text-sm sm:mb-1">
									{new URL(url).host}
								</div>
								<h4 className="mt-1 mb-4 line-clamp-2 h-[3rem] font-medium text-base">
									{ogpData.title || url}
								</h4>
							</div>
						</CardContent>
					</div>
				</Card>
			</a>
		</div>
	);
}
