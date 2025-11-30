export class Graei {
    activeOverlays = new Map();
    /**
     * Renders a new UI overlay (widget) on the screen or updates an existing one.
     * @param processName The name of the process controlling this widget.
     * @param content The UI content to display.
     * @param initialPosition The starting position and size.
     */
    renderOverlay(processName, content, initialPosition) {
        const overlayId = `overlay-${processName}-${Date.now()}`;
        const newOverlay = {
            id: overlayId,
            processName,
            content,
            ...initialPosition,
            isVisible: true,
        };
        this.activeOverlays.set(overlayId, newOverlay);
        console.log(`Graei: Rendering overlay for process '${processName}' with ID '${overlayId}'.`);
        this.displayOverlays();
        return overlayId;
    }
    /**
     * Hides an overlay from the screen without destroying it.
     * @param overlayId The ID of the overlay to hide.
     */
    hideOverlay(overlayId) {
        const overlay = this.activeOverlays.get(overlayId);
        if (overlay) {
            overlay.isVisible = false;
            console.log(`Graei: Hiding overlay '${overlayId}'.`);
            this.displayOverlays();
        }
    }
    /**
     * Shows a previously hidden overlay.
     * @param overlayId The ID of the overlay to show.
     */
    showOverlay(overlayId) {
        const overlay = this.activeOverlays.get(overlayId);
        if (overlay) {
            overlay.isVisible = true;
            console.log(`Graei: Showing overlay '${overlayId}'.`);
            this.displayOverlays();
        }
    }
    /**
     * Removes and destroys an overlay completely.
     * @param overlayId The ID of the overlay to destroy.
     */
    destroyOverlay(overlayId) {
        if (this.activeOverlays.has(overlayId)) {
            this.activeOverlays.delete(overlayId);
            console.log(`Graei: Destroying overlay '${overlayId}'.`);
            this.displayOverlays();
        }
    }
    /**
     * Simulates the display logic for all active, visible overlays.
     * In a real UI, this would be the main render loop.
     */
    displayOverlays() {
        console.log("--- Graei Display Update ---");
        const visibleOverlays = Array.from(this.activeOverlays.values()).filter(o => o.isVisible);
        if (visibleOverlays.length === 0) {
            console.log("(No active overlays)");
            return;
        }
        visibleOverlays.forEach(overlay => {
            console.log(`  > Displaying '${overlay.processName}' at (${overlay.x}, ${overlay.y})`);
        });
        console.log("---------------------------");
    }
}
