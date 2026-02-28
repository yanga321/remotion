import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';

export const myVideoSchema = z.object({
	titleText: z.string(),
	titleColor: z.string(),
	backgroundColor: z.string(),
});

type MyVideoProps = z.infer<typeof myVideoSchema>;

export const MyVideo: React.FC<MyVideoProps> = ({
	titleText,
	titleColor,
	backgroundColor,
}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Title slides up with a spring animation
	const titleTranslation = spring({
		frame,
		fps,
		config: {damping: 100, stiffness: 200},
	});
	const titleY = interpolate(titleTranslation, [0, 1], [50, 0]);

	// Fade in the title
	const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Subtitle fades in later
	const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Everything fades out at the end
	const fadeOut = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 5],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor,
				justifyContent: 'center',
				alignItems: 'center',
				opacity: fadeOut,
			}}
		>
			<div
				style={{
					transform: `translateY(${titleY}px)`,
					opacity: titleOpacity,
					fontSize: 80,
					fontWeight: 'bold',
					fontFamily: 'SF Pro Text, Helvetica, Arial, sans-serif',
					color: titleColor,
					textAlign: 'center',
				}}
			>
				{titleText}
			</div>
			<Sequence from={40}>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						top: 100,
						opacity: subtitleOpacity,
					}}
				>
					<div
						style={{
							fontSize: 36,
							fontFamily: 'SF Pro Text, Helvetica, Arial, sans-serif',
							color: '#666',
							textAlign: 'center',
						}}
					>
						Edit src/MyVideo.tsx to start creating
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
