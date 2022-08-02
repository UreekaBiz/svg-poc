import { architectRoughness, artistRoughness, boldStrokeWidth, cartoonistRoughness, extraBoldStrokeWidth, thinStrokeWidth } from '../editor/shape/constant';
import { isInputEvent, isInputTarget, isMouseEvent } from '../editor/util';
import { ToolbarItemDefinition } from './type';
import { isHexColorRegex } from '../util';

// ********************************************************************************
// ================================================================================
export const createToolbarItemDefinition = (): ToolbarItemDefinition => {
  // -- Container -----------------------------------------------------------------
  const modifierContainer = document.createElement('div');
        modifierContainer.setAttribute('style', 'display: flex; flex-direction: column;')

  // -- Stroke --------------------------------------------------------------------
  const strokeLabel = createLabel('Stroke');
  const strokeInputContainer = document.createElement('div');
        strokeInputContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const strokeColorContainer = document.createElement('div');
          strokeColorContainer.setAttribute('style', 'flex-basis: 30%; background-color: black;');

    const strokeColorInput = document.createElement('input');
          strokeColorInput.setAttribute('style', 'flex-basis: 70%;');
          strokeColorInput.value = '#000000';

  strokeInputContainer.appendChild(strokeColorContainer);
  strokeInputContainer.appendChild(strokeColorInput);

  // -- Background ----------------------------------------------------------------
  const backgroundLabel = createLabel('Background');
  const backgroundInputContainer = document.createElement('div');
        backgroundInputContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const backgroundColorContainer = document.createElement('div');
          backgroundColorContainer.setAttribute('style', 'flex-basis: 30%; background-color: black;');

    const backgroundColorInput = document.createElement('input');
          backgroundColorInput.setAttribute('style', 'flex-basis: 70%;');
          backgroundColorInput.value = '#000000';

  backgroundInputContainer.appendChild(backgroundColorContainer);
  backgroundInputContainer.appendChild(backgroundColorInput);

  // -- Fill ----------------------------------------------------------------------
  const fillLabel = createLabel('Fill');
  const fillButtonContainer = document.createElement('div');
        fillButtonContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const hachureButton = document.createElement('button');
          hachureButton.innerText = 'Hachure';
          hachureButton.setAttribute('style', 'flex-basis: 33%; color: red;');

    const crossHatchButton = document.createElement('button');
          crossHatchButton.innerText = 'Cross-Hatch';
          crossHatchButton.setAttribute('style', 'flex-basis: 33%;');

    const solidFillButton = document.createElement('button');
          solidFillButton.innerText = 'Solid';
          solidFillButton.setAttribute('style', 'flex-basis: 33%;');

  fillButtonContainer.appendChild(hachureButton);
  fillButtonContainer.appendChild(crossHatchButton);
  fillButtonContainer.appendChild(solidFillButton);

  // -- Stroke-Width --------------------------------------------------------------
  const strokeWidthLabel = createLabel('Stroke Width');
  const strokeWidthButtonContainer = document.createElement('div');
        strokeWidthButtonContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const thinButton = document.createElement('button');
          thinButton.innerText = 'Thin';
          thinButton.setAttribute('style', 'flex-basis: 33%; color: red;');

    const boldButton = document.createElement('button');
          boldButton.innerText = 'Bold';
          boldButton.setAttribute('style', 'flex-basis: 33%;');

    const extraBoldButton = document.createElement('button');
          extraBoldButton.innerText = 'ExtraBold';
          extraBoldButton.setAttribute('style', 'flex-basis: 33%;');

  strokeWidthButtonContainer.appendChild(thinButton);
  strokeWidthButtonContainer.appendChild(boldButton);
  strokeWidthButtonContainer.appendChild(extraBoldButton);

  // -- Stroke-Style ------------------------------------------------------------
  const strokeStyleLabel = createLabel('Stroke Style');
  const strokeStyleButtonContainer = document.createElement('div');
        strokeStyleButtonContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const solidStrokeButton = document.createElement('button');
          solidStrokeButton.innerText = 'Solid';
          solidStrokeButton.setAttribute('style', 'flex-basis: 33%; color: red;');

    const dashedButton = document.createElement('button');
          dashedButton.innerText = 'Dashed';
          dashedButton.setAttribute('style', 'flex-basis: 33%;');

    const dottedButton = document.createElement('button');
          dottedButton.innerText = 'Dotted';
          dottedButton.setAttribute('style', 'flex-basis: 33%;');

  strokeStyleButtonContainer.appendChild(solidStrokeButton);
  strokeStyleButtonContainer.appendChild(dashedButton);
  strokeStyleButtonContainer.appendChild(dottedButton);

  // -- Roughness -----------------------------------------------------------------
  const roughnessLabel = createLabel('Roughness');
  const roughnessButtonContainer = document.createElement('div');
        roughnessButtonContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const architectButton = document.createElement('button');
          architectButton.innerText = 'Architect';
          architectButton.setAttribute('style', 'flex-basis: 33%;');

    const artistButton = document.createElement('button');
          artistButton.innerText = 'Artist';
          artistButton.setAttribute('style', 'flex-basis: 33%; color: red;');

    const cartoonistButton = document.createElement('button');
          cartoonistButton.innerText = 'Cartoonist';
          cartoonistButton.setAttribute('style', 'flex-basis: 33%;');

  roughnessButtonContainer.appendChild(architectButton);
  roughnessButtonContainer.appendChild(artistButton);
  roughnessButtonContainer.appendChild(cartoonistButton);

  // -- Edges ---------------------------------------------------------------------
  const edgeLabel = createLabel('Edges');
  const edgeButtonContainer = document.createElement('div');
        edgeButtonContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const sharpButton = document.createElement('button');
          sharpButton.innerText = 'Sharp';
          sharpButton.setAttribute('style', 'flex-basis: 33%; color: red;');

    const roundButton = document.createElement('button');
          roundButton.innerText = 'Round';
          roundButton.setAttribute('style', 'flex-basis: 33%;');

  edgeButtonContainer.appendChild(sharpButton);
  edgeButtonContainer.appendChild(roundButton);

  // -- Opacity -------------------------------------------------------------------
  const opacityLabel = createLabel('Opacity');
  const opacitySliderContainer = document.createElement('div');
        opacitySliderContainer.setAttribute('style', 'display: flex; margin: 2px 10px;');

    const opacitySliderInput = document.createElement('input');
          opacitySliderInput.setAttribute('style', 'flex-basis: 100%');
          opacitySliderInput.type = 'range';

  opacitySliderContainer.appendChild(opacitySliderInput);

  // -- Container -----------------------------------------------------------------
  modifierContainer.appendChild(strokeLabel);
  modifierContainer.appendChild(strokeInputContainer);

  modifierContainer.appendChild(backgroundLabel);
  modifierContainer.appendChild(backgroundInputContainer);

  modifierContainer.appendChild(fillLabel);
  modifierContainer.appendChild(fillButtonContainer);

  modifierContainer.appendChild(strokeWidthLabel);
  modifierContainer.appendChild(strokeWidthButtonContainer);

  modifierContainer.appendChild(strokeStyleLabel);
  modifierContainer.appendChild(strokeStyleButtonContainer);

  modifierContainer.appendChild(roughnessLabel);
  modifierContainer.appendChild(roughnessButtonContainer);

  modifierContainer.appendChild(edgeLabel);
  modifierContainer.appendChild(edgeButtonContainer);

  modifierContainer.appendChild(opacityLabel);
  modifierContainer.appendChild(opacitySliderContainer);

  const rectModifierContainer: ToolbarItemDefinition = {
    visualElement: modifierContainer,
    toolbarItems: [
      // -- Stroke ----------------------------------------------------------------
      {
        eventType: 'input',
        visualElement: strokeColorInput,
        action: (event, { svgEditor, toolbar }) => {
          const strokeColor = event.target.value;
          if(!event || !event.target || !isInputEvent(event) || !isInputTarget(event.target)) return;
          if(!isHexColorRegex(strokeColor)) return;

          strokeColorContainer.setAttribute('style', `flex-basis: 30%; background-color: ${strokeColor}`);

          toolbar.getStyle().stroke = strokeColor;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.stroke = strokeColor; });
        },
      },

      // -- Background ----------------------------------------------------------
      {
        eventType: 'input',
        visualElement: backgroundColorInput,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isInputEvent(event) || !isInputTarget(event.target)) return;
          const fillColor = event.target.value;
          if(!isHexColorRegex(fillColor)) return;

          backgroundColorContainer.setAttribute('style', `flex-basis: 30%; background-color: ${fillColor}`);

          toolbar.getStyle().fill = fillColor;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.fill = fillColor; });
        },
      },

      // -- Fill ------------------------------------------------------------------
      {
        eventType: 'click',
        visualElement: hachureButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          hachureButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          crossHatchButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          solidFillButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().fillStyle = 'hachure';
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.fillStyle = 'hachure'; });
        },
      },
      {
        eventType: 'click',
        visualElement: crossHatchButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          hachureButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          crossHatchButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          solidFillButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().fillStyle = 'cross-hatch';
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.fillStyle = 'cross-hatch'; });
        },
      },
      {
        eventType: 'click',
        visualElement: solidFillButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          hachureButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          crossHatchButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          solidFillButton.setAttribute('style', 'flex-basis: 33%; color: red;');

          toolbar.getStyle().fillStyle = 'solid';
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.fillStyle = 'solid'; });
        },
      },

      // -- Stroke-Width ----------------------------------------------------------
      {
        eventType: 'click',
        visualElement: thinButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          thinButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          boldButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          extraBoldButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().strokeWidth = thinStrokeWidth;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.strokeWidth = thinStrokeWidth; });
        },
      },
      {
        eventType: 'click',
        visualElement: boldButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          thinButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          boldButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          extraBoldButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().strokeWidth = boldStrokeWidth;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.strokeWidth = boldStrokeWidth; });
        },
      },
      {
        eventType: 'click',
        visualElement: extraBoldButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          thinButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          boldButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          extraBoldButton.setAttribute('style', 'flex-basis: 33%; color: red;');

          toolbar.getStyle().strokeWidth = extraBoldStrokeWidth;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.strokeWidth = extraBoldStrokeWidth; });
        },
      },

      // -- Stroke-Style ----------------------------------------------------------
      {
        eventType: 'click',
        visualElement: solidStrokeButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          solidStrokeButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          dashedButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          dottedButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().strokeStyle = 'solid';
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.strokeStyle = 'solid'; });
        },
      },
      {
        eventType: 'click',
        visualElement: dashedButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          solidStrokeButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          dashedButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          dottedButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().strokeStyle = 'dashed';
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.strokeStyle = 'dashed'; });
        },
      },
      {
        eventType: 'click',
        visualElement: dottedButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          solidStrokeButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          dashedButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          dottedButton.setAttribute('style', 'flex-basis: 33%; color: red;');

          toolbar.getStyle().strokeStyle = 'dotted';
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.strokeStyle = 'dotted'; });
        },
      },

      // -- Roughness -------------------------------------------------------------
      {
        eventType: 'click',
        visualElement: architectButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          architectButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          artistButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          cartoonistButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().roughness = architectRoughness;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.roughness = architectRoughness; });
        },
      },
      {
        eventType: 'click',
        visualElement: artistButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          architectButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          artistButton.setAttribute('style', 'flex-basis: 33%; color: red;');
          cartoonistButton.setAttribute('style', 'flex-basis: 33%; color: black;');

          toolbar.getStyle().roughness = artistRoughness;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.roughness = artistRoughness; });
        },
      },
      {
        eventType: 'click',
        visualElement: cartoonistButton,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !event.target || !isMouseEvent(event)) return;

          architectButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          artistButton.setAttribute('style', 'flex-basis: 33%; color: black;');
          cartoonistButton.setAttribute('style', 'flex-basis: 33%; color: red;');

          toolbar.getStyle().roughness = cartoonistRoughness;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.roughness = cartoonistRoughness; });
        },
      },

      // -- Edges -----------------------------------------------------------------
// FIXME: DO!
//      {
//        eventType: 'click',
//        visualElement: sharpButton,
//        action: (event, { svgEditor, toolbar }) => {
//          if(!event || !event.target || !isMouseEvent(event)) return;
//
//          sharpButton.setAttribute('style', 'flex-basis: 33%; color: red;');
//          roundButton.setAttribute('style', 'flex-basis: 33%; color: black;');
//
//          toolbar.getStyle().rx = sharpCornerRadius.x.toString();
//          toolbar.getStyle().ry = sharpCornerRadius.y.toString();
//
//          svgEditor.updateSelectedContentStyle(contentEntry => {
//            contentEntry.shape.style['rx'] = sharpCornerRadius.x.toString();
//            contentEntry.shape.style['ry'] = sharpCornerRadius.y.toString();
//          });
//        },
//      },
//      {
//        eventType: 'click',
//        visualElement: roundButton,
//        action: (event, { svgEditor, toolbar }) => {
//          if(!event || !event.target || !isMouseEvent(event)) return;
//
//          sharpButton.setAttribute('style', 'flex-basis: 33%; color: black;');
//          roundButton.setAttribute('style', 'flex-basis: 33%; color: red;');
//
//          toolbar.getStyle().rx = roundCornerRadius.x.toString();
//          toolbar.getStyle().ry = roundCornerRadius.y.toString();
//
//          svgEditor.updateSelectedContentStyle(contentEntry => {
//            contentEntry.shape.style['rx'] = roundCornerRadius.x.toString();
//            contentEntry.shape.style['ry'] = roundCornerRadius.y.toString();
//            svgEditor.renderContent(contentEntry, true, false);
//          });
//        },
//      },

      // -- Opacity ---------------------------------------------------------------
      {
        eventType: 'input',
        visualElement: opacitySliderInput,
        action: (event, { svgEditor, toolbar }) => {
          if(!event || !isInputEvent(event) || !(event.target) || !isInputTarget(event.target)) return;

          const opacity = (parseInt(event.target.value) / 100/*values go from 0 to 1*/);
          toolbar.getStyle().opacity = opacity;
          svgEditor.updateSelectedContentStyle(contentEntry => { contentEntry.shape.style.opacity = opacity; });
        },
      },
    ]
  };

  return rectModifierContainer;
};

// ................................................................................
const createLabel = (text: string) => {
  const label = document.createElement('p');
        label.innerText = text;
        label.setAttribute('style', 'flex-basis: 100%; margin: 12px 10px 2px 10px;');
  return label;
};
