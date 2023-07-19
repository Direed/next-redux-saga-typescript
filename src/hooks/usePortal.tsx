import { useRef, useEffect } from 'react';

/**
 * Creates DOM element to be used as React root.
 */
const createRootElement = (id: string) => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', id);

  return rootContainer;
};

/**
 * Appends element as last child of body.
 */
const addRootElement = (rootElem: HTMLDivElement) => {
  document.body.insertBefore(
      rootElem,
      document.body.lastElementChild?.nextElementSibling as HTMLDivElement,
  );
};

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * Example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * The id of the target container, e.g 'modal' or 'spotlight'
 * The DOM node to use as the Portal target.
 */
const usePortal = (id: string) => {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent = document.querySelector(`#${id}`);
    // Parent is either a new root or the existing dom element
    const parentElem = existingParent || createRootElement(id);

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentElem as HTMLDivElement);
    }

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current as HTMLDivElement);

    return () => {
      rootElemRef?.current?.remove();
      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }

    return rootElemRef.current;
  };

  return getRootElem();
};

export default usePortal;