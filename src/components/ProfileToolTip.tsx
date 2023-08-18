import React from 'react'


interface ProfileToolTipProps {
    id: string;
    name: string;
  }

const ProfileToolTip: React.FC<ProfileToolTipProps> = ({ id, name }) => {
    return (
        <div
            id={id}
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
            {name}
            <div className="tooltip-arrow" data-popper-arrow="" />
        </div>
    )
}

export default ProfileToolTip