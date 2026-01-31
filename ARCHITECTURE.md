# Collaborative Canvas Architecture

## Overview
This application is a real-time multi-user drawing platform built using
HTML5 Canvas and Socket.io.

## Client Side
- Captures mouse input
- Renders strokes
- Sends drawing data via WebSocket
- Displays remote cursors

## Server Side
- Acts as central coordinator
- Stores drawing history
- Handles undo per user
- Broadcasts events

## Communication
- WebSocket using Socket.io
- JSON-based messages
- Server is source of truth

## State Management
- Server maintains stroke array
- New users replay history
- Undo removes last user stroke

## Synchronization
- Clients redraw from history
- Avoids conflicts
- Prevents flickering
