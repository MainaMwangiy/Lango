import React from 'react';
import theme from './theme';

function NewVersionNotification({ onInstall, onCancel }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: theme.colors.primary,
            color: theme.colors.text,
            padding: '20px 10px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <p style={{
                margin: '0 0 20px 0',
                fontSize: theme.fontSizes.large,
                textAlign: 'center'
            }}>
                New version available.
            </p>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}>
                <button onClick={onCancel} style={{
                    marginRight: '10px',
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                    fontSize: theme.fontSizes.medium,
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    outline: 'none',
                }}>
                    Cancel
                </button>
                <button onClick={onInstall} style={{
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.text,
                    fontSize: theme.fontSizes.medium,
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    outline: 'none',
                }}>
                    Install
                </button>
            </div>
        </div>
    );
}

export default NewVersionNotification;
