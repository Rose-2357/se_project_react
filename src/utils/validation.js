export function checkValidity(
  e,
  defaultObject,
  setFunction,
  additionalFunction = null,
) {
  if (!e.target.validity.valid) {
    setFunction({
      ...defaultObject,
      [e.target.name]: {
        error: true,
        message: ` (${e.target.validationMessage})`,
      },
    });
  } else if (additionalFunction) {
    additionalFunction(e, defaultObject, setFunction);
  } else {
    setFunction({
      ...defaultObject,
      [e.target.name]: {
        error: false,
        message: "",
      },
    });
  }
}

export function displayValid(e, defaultObject, setFunction) {
  setFunction({
    ...defaultObject,
    [e.target.name]: {
      error: true,
      message: "",
    },
  });
}

export function checkImageValidity(e, defaultObject, setFunction) {
  const test = new Image();
  test.src = e.target.value;

  const loadImage = new Promise((resolve, reject) => {
    test.onerror = () => reject();
    test.onload = () => resolve();
  });

  loadImage
    .then(() =>
      setFunction({
        ...defaultObject,
        [e.target.name]: {
          error: false,
          message: "",
        },
      }),
    )
    .catch(() =>
      setFunction({
        ...defaultObject,
        [e.target.name]: {
          error: true,
          message: " (URL is not a valid image)",
        },
      }),
    )
    .finally(() => {
      test.remove();
    });
}
