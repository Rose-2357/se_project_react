export function checkValidity(e, setFunction, additionalFunction = null) {
  if (!e.target.validity.valid) {
    setFunction({
      error: true,
      message: ` (${e.target.validationMessage})`,
    });
  } else if (additionalFunction) {
    additionalFunction(e, setFunction);
  } else {
    setFunction({
      error: false,
      message: "",
    });
  }
}

export function displayValid(e, setFunction) {
  setFunction({
    error: true,
    message: "",
  });
}

export function checkImageValidity(e, setFunction) {
  const test = new Image();
  test.src = e.target.value;

  const loadImage = new Promise((resolve, reject) => {
    test.onerror = () => reject();
    test.onload = () => resolve();
  });

  loadImage
    .then(() =>
      setFunction({
        error: false,
        message: "",
      })
    )
    .catch(() =>
      setFunction({
        error: true,
        message: " (URL is not a valid image)",
      })
    )
    .finally(() => {
      test.remove();
    });
}
