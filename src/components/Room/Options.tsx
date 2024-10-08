import { Tooltip } from 'flowbite-react'
import React, { useState, useEffect, useRef } from 'react'

interface OptionsProps {
  leaveSpace: () => void;
}

const Options: React.FC<OptionsProps> = ({ leaveSpace }) => {
  const [isMicMuted, setIsMicMuted] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
      }
    }
  }, [])

  const handleMuteMicrophone = () => {
    setIsMicMuted(!isMicMuted)
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMicMuted
      })
    }
  }

  const startCall = async () => {
    try {
      setIsConnecting(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      localStreamRef.current = stream

      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      })

      stream.getTracks().forEach(track => {
        peerConnectionRef.current?.addTrack(track, stream)
      })

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          // Send the ICE candidate to the signaling server
          // You'll need to implement this part
          // sendSignalingMessage({ type: 'ice-candidate', candidate: event.candidate, spaceId })
        }
      }

      const offer = await peerConnectionRef.current.createOffer()
      await peerConnectionRef.current.setLocalDescription(offer)

      // Send the offer to the signaling server
      // You'll need to implement this part
      // sendSignalingMessage({ type: 'offer', offer, spaceId })

      setIsCallActive(true)
      setIsConnecting(false)
    } catch (error) {
      console.error('Error starting call:', error)
      setIsConnecting(false)
    }
  }

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
    }
    setIsCallActive(false)
  }

  return (
    <div className="flex items-center justify-center lg:mx-auto">
      <Tooltip animation="duration-500" content={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}>
        <button
          onClick={handleMuteMicrophone}
          type="button"
          className={`p-2.5 group rounded-full ${isMicMuted ? 'text-gray-400' : 'text-blue-400'}`}
        >
          <svg
            className="w-6 h-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 19"
          >
            <path d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
            <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
          </svg>
          <span className="sr-only">{isMicMuted ? 'Unmute microphone' : 'Mute microphone'}</span>
        </button>
      </Tooltip>
      <Tooltip animation="duration-500" content={isCallActive ? 'End call' : 'Start call'}>
        <button
          onClick={isCallActive ? endCall : startCall}
          type="button"
          className={`p-2.5 group rounded-full ${isCallActive ? 'text-red-400' : 'text-green-400'}`}
          disabled={isConnecting}
        >
          <svg
            className="w-6 h-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"
            />
          </svg>
          <span className="sr-only">{isCallActive ? 'End call' : 'Start call'}</span>
        </button>
      </Tooltip>
      <Tooltip animation="duration-500" content="Open cam">
        <button
          type="button"
          className="p-2.5 group rounded-full"
        >
          <svg
            className="w-6 h-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
          </svg>
          <span className="sr-only">Hide camera</span>
        </button>
      </Tooltip>
      <Tooltip animation="duration-500" content="Space settings">
        <button
          type="button"
          className="p-2.5 group rounded-full"
        >
          <svg
            className="w-6 h-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
            />
          </svg>
          <span className="sr-only">Video settings</span>
        </button>
      </Tooltip>
      <Tooltip animation="duration-500" content="Leave space">
        <button
          type="button"
          className="p-2.5 group rounded-full text-red-400"
          onClick={leaveSpace}
        >
          <svg
            className="w-6 h-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 15"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"
            />
          </svg>
          <span className="sr-only">Leave space</span>
        </button>
      </Tooltip>
    </div>
  )
}

export default Options