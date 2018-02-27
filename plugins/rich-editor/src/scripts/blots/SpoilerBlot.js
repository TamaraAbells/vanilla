/**
 * @author Adam (charrondev) Charron <adam.c@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license https://opensource.org/licenses/GPL-2.0 GPL-2.0
 */

import WrapperBlot from "./WrapperBlot";
import ClassFormatBlot  from "./ClassFormatBlot";
import { wrappedBlot } from "../quill-utilities";
import Break from "quill/blots/break";
import Parchment from "parchment";

class SpoilerLineBlot extends ClassFormatBlot {
    static blotName = "spoiler-line";
    static className = "spoiler-line";
    static tagName = 'p';
    static parentName = "spoiler-content";

    insertAt(index, length) {
        super.insertAt(index, length);
    }
}

export default wrappedBlot(SpoilerLineBlot);

class ContentBlot extends WrapperBlot {
    static className = 'spoiler-content';
    static blotName = 'spoiler-content';
    static parentName = 'spoiler';

    hasLastTwoEmptyChildren() {
        let children = this.children;

        return children.length >= 3
            && children.tail.children.tail.domNode.nodeName === "BR"
            && children.tail.prev.children.tail.domNode.nodeName === "BR"
            && children.tail.prev.prev.children.tail.domNode.nodeName === "BR";
    }

    // insertAt(index, name, value) {
    //     super.insertAt(index, name, value);
    //
    //     if (this.hasLastThreeEmptyChildren()) {
    //         // Place the insert at the end of this Blot.
    //         this.parent.parent.insertAt(this.offset() + this.length(), name, value);
    //
    //     } else {
    //         super.insertAt(index, name, value);
    //     }
    // }

    update(mutations) {
        super.update(mutations);
        console.log(mutations);
    }

    optimize(context) {
        // super.optimize(context);
        if (this.hasLastTwoEmptyChildren()) {
            console.log(this.children);

            this.children.tail.remove();
            this.children.tail.remove();

            const block = Parchment.create("block");
            // block.insertInto(this.parent.parent);
            this.parent.parent.insertAt(this.offset() + this.length(), block);

            this.children.tail.remove();
        } else {
            super.optimize(context);
        }
    }
}

export const SpoilerContentBlot = wrappedBlot(ContentBlot);

const spoilerButton = `
<button class="iconButton button-spoiler" type="button">
            <span class="spoiler-warning">
                <span class="spoiler-warningMain">
                    <svg class="icon spoiler-icon">
                        <title>Crossed Eye</title>
                        <path fill="currentColor" transform="translate(0 -1)" d="M6.57317675,16.3287231 C4.96911243,15.3318089 3.44472018,13.8889012 2,12 C5.05938754,8 8.47605421,6 12.25,6 C13.6612883,6 15.0226138,6.27968565 16.3339763,6.83905696 L20.6514608,2.64150254 C20.8494535,2.44900966 21.1660046,2.45346812 21.3584975,2.6514608 C21.5509903,2.84945348 21.5465319,3.16600458 21.3485392,3.35849746 L3.3485392,20.8584975 C3.15054652,21.0509903 2.83399542,21.0465319 2.64150254,20.8485392 C2.44900966,20.6505465 2.45346812,20.3339954 2.6514608,20.1415025 L6.57317675,16.3287231 L6.57317675,16.3287231 Z M15.5626154,7.58899113 C14.5016936,7.19530434 13.4103266,7 12.2871787,7 C9.03089027,7 6.04174149,8.64166208 3.28717875,12 C4.57937425,13.575433 5.92319394,14.7730857 7.3219985,15.600702 L8.69990942,14.2610664 C8.25837593,13.6178701 8,12.8391085 8,12 C8,9.790861 9.790861,8 12,8 C12.8795188,8 13.6927382,8.28386119 14.353041,8.76496625 L15.5626154,7.58899113 L15.5626154,7.58899113 Z M13.6219039,9.47579396 C13.1542626,9.17469368 12.5975322,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,12.5672928 9.15745957,13.0978089 9.43105789,13.5502276 L10.1773808,12.8246358 C10.0634411,12.573203 10,12.2940102 10,12 C10,10.8954305 10.8954305,10 12,10 C12.3140315,10 12.6111588,10.0723756 12.8756113,10.2013562 L13.6219039,9.47579396 L13.6219039,9.47579396 Z M8.44878963,17.2769193 L9.24056594,16.4926837 C10.2294317,16.8317152 11.2446131,17 12.2871787,17 C15.5434672,17 18.532616,15.3583379 21.2871787,12 C20.0256106,10.4619076 18.7148365,9.28389964 17.351729,8.45876979 L18.0612628,7.7559935 C19.6161185,8.74927417 21.0956975,10.163943 22.5,12 C19.4406125,16 16.0239458,18 12.25,18 C10.9398729,18 9.67280281,17.7589731 8.44878963,17.2769193 L8.44878963,17.2769193 Z M10.1795202,15.5626719 L10.9415164,14.8079328 C11.2706747,14.9320752 11.627405,15 12,15 C13.6568542,15 15,13.6568542 15,12 C15,11.6375376 14.9357193,11.2900888 14.8179359,10.9684315 L15.579952,10.2136728 C15.8487548,10.7513317 16,11.3580032 16,12 C16,14.209139 14.209139,16 12,16 C11.3443726,16 10.7255863,15.8422643 10.1795202,15.5626719 L10.1795202,15.5626719 Z M11.7703811,13.986962 L13.9890469,11.7894264 C13.9962879,11.8586285 14,11.9288807 14,12 C14,13.1045695 13.1045695,14 12,14 C11.9223473,14 11.8457281,13.9955745 11.7703811,13.986962 Z"></path>
                    </svg>
                    <strong class="spoiler-warningBefore">
                        Warning:
                    </strong>
                    <span class="spoiler-warningAfter">
                        Click here to hide spoiler
                    </span>
                </span>
                <span class="spoiler-chevron">
                    <svg class="icon spoiler-chevronUp">
                        <title>▲</title>
                        <path fill="currentColor" d="M0,3.6c0-0.1,0-0.2,0.1-0.3l3.5-3.1C3.7,0,3.9,0,4,0c0.1,0,0.3,0,0.4,0.1l3.5,3.1C8,3.3,8,3.4,8,3.6s0,0.2-0.1,0.3C7.8,4,7.6,4,7.5,4h-7C0.4,4,0.2,4,0.1,3.9C0,3.8,0,3.7,0,3.6z"></path>
                    </svg>
                    <svg class="icon spoiler-chevronDown">
                        <title>▼</title>
                        <path fill="currentColor" d="M8,3.55555556 C8,3.43518519 7.95052083,3.33101852 7.8515625,3.24305556 L4.3515625,0.131944444 C4.25260417,0.0439814815 4.13541667,0 4,0 C3.86458333,0 3.74739583,0.0439814815 3.6484375,0.131944444 L0.1484375,3.24305556 C0.0494791667,3.33101852 -4.4408921e-16,3.43518519 -4.4408921e-16,3.55555556 C-4.4408921e-16,3.67592593 0.0494791667,3.78009259 0.1484375,3.86805556 C0.247395833,3.95601852 0.364583333,4 0.5,4 L7.5,4 C7.63541667,4 7.75260417,3.95601852 7.8515625,3.86805556 C7.95052083,3.78009259 8,3.67592593 8,3.55555556 Z" transform="matrix(1 0 0 -1 0 4)"></path>
                    </svg>
                </span>
            </span>
        </button>
`;

export class InlinedWrapperBlot extends WrapperBlot {
    static className = "inlined";
    static blotName = "inlined";
    static tagName = "span";
}

export class SpoilerWrapperBlot extends WrapperBlot {
    static className = 'spoiler';
    static blotName = 'spoiler';

    isOpen = true;

    attachHandle() {
        this.handle = document.createElement("div");
        this.handle.classList.add("spoiler-buttonContainer");
        this.handle.innerHTML = spoilerButton;
        this.handle.setAttribute("contenteditable", false);

        this.handle.addEventListener("click", () => {
            this.isOpen = !this.isOpen;
            this.setOpenState();
        });
        this.domNode.prepend(this.handle);
    }

    setOpenState() {
        if (this.domNode.classList.contains("isShowingSpoiler") !== this.isOpen) {
            this.domNode.classList.toggle("isShowingSpoiler");
        }
    }

    optimize() {
        super.optimize();

        if (!this.domNode.children[0].classList.contains("spoiler-buttonContainer")) {
            this.attachHandle();
        }

        this.setOpenState();
    }

    update(index, length) {
        super.update(index, length);
    }
}
