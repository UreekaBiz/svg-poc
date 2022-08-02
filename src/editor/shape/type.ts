import { customAlphabet } from 'nanoid';

import { isResizerLocation, ResizerLocation } from '../resizer';

// ********************************************************************************
// == Shape =======================================================================
export type ShapeIdentifier = string/*alias*/;

// --------------------------------------------------------------------------------
export enum ShapeType {
  Ellipse = 'ellipse',
  Line = 'line',
  Rectangle = 'rectangle',
};

// --------------------------------------------------------------------------------
// all shapes are identified by id. The sub-parts of a shape (selection, resizers,
// etc) all have the same base id and then append their specific information.
// To allow for delimiters, the shape ID is only alpha-numeric
// NOTE: HTML ids are limited to: must begin with a letter ([A-Za-z]) and may be
//       followed by any number of letters, digits ([0-9]), hyphens ("-"),
//       underscores ("_"), colons (":"), and periods (".")
// NOTE: shapes have a custom prefix 'sh:' as an attempt to not have them collide
//       with any other identifiers
const customNanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10/*T&E*/);
export const createShapeId = () => `sh:${customNanoid()}`;
export const createShapeSelectionId = (id: ShapeIdentifier) => `${id}:select`;
export const createShapeResizerId = (id: ShapeIdentifier, location: ResizerLocation) => `${id}:${location}`;
export const createShapeRotatorId = (id: ShapeIdentifier) => `${id}:rotator`;

// parses any type of ShapeIdentifier and returns the root identifier
const SHAPE_ID_REGEX = /^(sh:[0-9a-zA-Z]+)(?::([^$]+))?$/;
export const parseShapeId = (id: ShapeIdentifier): ShapeIdentifier | undefined/*not a shape*/ => {
  const groups = id.match(SHAPE_ID_REGEX);
  if(!groups || (groups.length < 2)) return undefined/*not a valid shape id*/;
  return groups[1/*1st capture group*/];
};
export const parseShapeResizerId = (id: ShapeIdentifier) => {
  const groups = id.match(SHAPE_ID_REGEX);
  if(!groups || (groups.length < 3)) return undefined/*not a valid shape id and/or resizer*/;
  return isResizerLocation(groups[2/*2nd capture group*/])
            ? { shapeId: groups[1/*1st capture group*/], location: groups[2/*2nd capture group*/] as ResizerLocation/*by definition*/ }
            : undefined/*not a resizer*/;
};
export const parseShapeRotatorId = (id: ShapeIdentifier): ShapeIdentifier | undefined/*not a shape*/ => {
  const groups = id.match(SHAPE_ID_REGEX);
  if(!groups || (groups.length < 3)) return undefined/*not a valid shape id and/or rotator*/;
  return (groups[2/*2nd capture group*/] === 'rotator')
            ? groups[1/*1st capture group*/]
            : undefined/*not a resizer*/;
};
