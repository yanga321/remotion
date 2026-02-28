import React from 'react';
import {Composition} from 'remotion';
import {MyVideo, myVideoSchema} from './MyVideo';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyVideo"
				component={MyVideo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={myVideoSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: '#000000',
					backgroundColor: '#ffffff',
				}}
			/>
		</>
	);
};
