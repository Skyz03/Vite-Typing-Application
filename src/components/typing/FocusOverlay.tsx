type FocusOverlayProps = {
    onStart: () => void;
};

export function FocusOverlay({ onStart }: FocusOverlayProps) {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-app-bg/10 backdrop-blur-sm transition-all duration-500">
            <button
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-600/20 transform transition-all active:scale-95 flex items-center gap-2 mb-4"
            >
                <span className="text-lg">⌨️</span>
                Click to Start Typing Test
            </button>

        </div>
    );
}